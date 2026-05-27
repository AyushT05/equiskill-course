"use client";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialogue from "../_components/LoadingDialogue";
import Service from "@/configs/Service";
import { useRouter } from "next/navigation";

function CoursePage({ params: paramsPromise }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [params, setParams] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Unwrap params before using them
    paramsPromise.then(setParams);
  }, [paramsPromise]);

  useEffect(() => {
    if (params && user?.primaryEmailAddress?.emailAddress) {
      getCourse();
    }
  }, [params, user]);

  const getCourse = async () => {
    if (!params?.courseId) return;
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params?.courseId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      setCourse(result[0]);
      console.log(result);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.Chapters || course?.courseOutput?.["Chapters"];
    console.log("Chapters to generate:", chapters);

    if (chapters && chapters.length > 0) {
      try {
        const usedVideoIds = [];
        for (let index = 0; index < chapters.length; index++) {
            const chapter = chapters[index];
            const chapterName = chapter?.ChapterName || chapter?.["Chapter Name"] || `Chapter ${index + 1}`;
            
            try {
              // Enforce category/class standard and depth in the explanation
              const PROMPT = `explain the concept in Detail on Topic: ${course?.name}, Chapter: ${chapterName}, Board: ${course?.board}, Language: ${course?.language}. 
IMPORTANT: The content level, complexity, depth, and explanation style must be strictly relevant and tailored to the Category/Grade level: ${course?.category || '12th Class'} standard.
FORMATTING INSTRUCTIONS: The 'explanation' field must be highly engaging, catchy, and structured using rich Markdown. Avoid long blocks or walls of text. Use the following formatting rules:
1. Break down explanations into short, highly digestible paragraphs.
2. Use bolding (**key terms**, **important formulas**, or **critical concepts**) to draw attention to crucial details.
3. Use bullet points (-) or numbered lists (1.) for lists of features, steps, rules, or comparisons.
4. Use markdown subheaders (e.g. ### Key Characteristics) for sub-sections.
5. Use markdown blockquotes (> Definition:) for definitions, equations, or key callouts.
6. Make it read like a premium educational textbook or study guide.

IMPORTANT FOR CODE EXAMPLES: Only populate the 'codeExample' field with a code block (wrapped in <precode>...</precode>) if the course is about programming, coding, software, or computer science. If the course is a non-programming/non-coding subject (such as Biology, Science, Thermodynamics, History, Geography, Physics, Chemistry, etc.), set the 'codeExample' field to an empty string "". DO NOT generate programming code or script simulations for non-coding subjects.
The output must be in JSON Format containing a single key 'topics' which is an array of objects. Each object must have the fields: 'title' (string), 'explanation' (detailed explanation of this subtopic in Markdown format), and 'codeExample' (string).`;
              
              console.log("Prompt for Chapter " + index + ":", PROMPT);

              // 1. Generate chapter text content via LLM
              const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
              let rawText = result?.response?.text() || "{}";
              
              // Clean markdown JSON wrapping if present
              rawText = rawText.trim();
              if (rawText.startsWith("```json")) {
                rawText = rawText.substring(7);
              } else if (rawText.startsWith("```")) {
                rawText = rawText.substring(3);
              }
              if (rawText.endsWith("```")) {
                rawText = rawText.substring(0, rawText.length - 3);
              }
              rawText = rawText.trim();

              const content = JSON.parse(rawText);

              // 2. Fetch related YouTube video
              let videoid = "";
              try {
                // Search with both course name and chapter name for higher specificity
                const searchQuery = `${course?.name || ""} ${chapterName}`;
                const videoResponse = await Service.getVideos(searchQuery);
                if (videoResponse && videoResponse.length > 0) {
                  // Find the first video not already used for previous chapters of this course
                  const unusedVideo = videoResponse.find(v => v?.id?.videoId && !usedVideoIds.includes(v.id.videoId));
                  if (unusedVideo) {
                    videoid = unusedVideo.id.videoId;
                    usedVideoIds.push(videoid);
                  } else {
                    videoid = videoResponse[0]?.id?.videoId || "";
                  }
                  console.log(`Video ID for chapter ${index} (${chapterName}):`, videoid);
                }
              } catch (videoErr) {
                console.error("Error fetching video for chapter " + index + ":", videoErr);
              }

              // Delete any existing chapter content for this ID/index to prevent duplicates
              await db.delete(Chapters).where(and(eq(Chapters.courseId, course?.courseId), eq(Chapters.chapterId, index)));

              // 3. Insert into database (videoId must be a string to satisfy NOT NULL constraint)
              await db.insert(Chapters).values({
                chapterId: index,
                courseId: course?.courseId,
                content: content,
                videoId: videoid || "", 
              });

            } catch (chapterError) {
              console.error(`Error generating chapter ${index}:`, chapterError);
              
              // Fallback insertion so the course start page can still load cleanly
              await db.delete(Chapters).where(and(eq(Chapters.courseId, course?.courseId), eq(Chapters.chapterId, index)));
              await db.insert(Chapters).values({
                chapterId: index,
                courseId: course?.courseId,
                content: {
                  topics: [
                    {
                      title: chapterName,
                      explanation: "Content generation is currently processing or failed. Please refresh or edit this chapter."
                    }
                  ]
                },
                videoId: ""
              });
            }
        }

        // Update CourseList publish status and route to finish page
        await db.update(CourseList).set({ publish: true }).where(eq(CourseList.courseId, course?.courseId));
        router.replace("/create-course/" + course?.courseId + "/finish");
      } catch (e) {
        console.log("Error during sequential generation batch:", e);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Chapters not found.");
      setLoading(false);
    }
  };

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

      <LoadingDialogue loading={loading} />
      <CourseBasicInfo course={course} refreshData={() => getCourse()} />
        <div className="items-center justify-center flex">     
           <Button className='my-10' onClick={GenerateChapterContent}>Generate</Button>
        </div>
      <CourseDetail course={course} />
      <ChapterList course={course} refreshData={() => getCourse()} />
      
    </div>
  );
}

export default CoursePage;
