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
            // Structured prompt — one clear idea per topic, no subheaders inside explanation
            const PROMPT = `You are an expert tutor creating content for a course card UI — NOT a textbook.

Course: ${course?.name}
Chapter: ${chapterName}
Level: ${course?.category || '12th Class'}
Board: ${course?.board}
Language: ${course?.language}

TASK: Break this chapter into 5–8 focused topics. Each topic covers ONE clear idea — a definition, a concept, an algorithm step, a formula, or a real-world application. Do not bundle multiple ideas into one topic.

RULES FOR EACH TOPIC:
- "title": Short, specific title (4–8 words). NOT generic labels like "Core Concept" or "Introduction".
- "explanation": Write as much as needed to fully explain the idea — but keep it organized. Use simple, everyday language a student would understand. Always include: a plain-English explanation of what it is and why it matters, a relatable real-world analogy or example, and any important formula, rule, or key fact highlighted in a blockquote (> ). Use **bold** for key terms. Use bullet lists or numbered steps where genuinely list-like. NO markdown headers (##, ###) inside explanation — the title IS the header.
- "codeExample": A well-commented, runnable snippet (15–30 lines) ONLY if this specific topic is about programming or an algorithm. Otherwise "".

TONE: Friendly, clear, mentor-like. Write like you are explaining to a curious student in plain English — not like a textbook or Wikipedia article. Avoid jargon without explanation.

Return ONLY valid JSON: { "topics": [ { "title": "", "explanation": "", "codeExample": "" } ] }`;

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
            if (course?.includeVideo === "Yes") {
              try {
                // Search with both course name and chapter name for higher specificity, plus educational keywords
                const searchQuery = `${course?.name || ""} ${chapterName} educational tutorial lecture`;
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
            } else {
              console.log(`Skipping video fetch for chapter ${index} as user selected "No" for videos.`);
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
      <CourseDetail course={course} />
      <ChapterList course={course} refreshData={() => getCourse()} />
      <Button className="my-10" onClick={GenerateChapterContent}>Generate</Button>
    </div>
  );
}

export default CoursePage;
