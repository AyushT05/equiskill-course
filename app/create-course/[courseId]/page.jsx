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
    const chapters = course?.courseOutput?.["Chapters"];
    console.log("Chapters:", chapters);

    if (chapters) {
      // Use Promise.all to wait for all chapter generations to complete
      try {
        await Promise.all(
          chapters.map(async (chapter, index) => {
            // Limit to the first 3 chapters for testing purposes, remove later
            if (index >= chapters.length) return;

            const chapterName = chapter?.["Chapter Name"];
            const PROMPT = `explain the concept in Detail on Topic: ${course?.name}, Chapter: ${chapterName}, Board: ${course?.board}, Language: ${course?.language} in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example(Code field in <precode> format) if applicable`;

            console.log(PROMPT);

            let videoid = "";
            const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
            console.log("result:", result?.response?.text());
            const content = JSON.parse(result?.response?.text());

            // Await videoId fetch
            const videoResponse = await Service.getVideos(
              course?.name + ":" + chapterName
            );
            if (videoResponse && videoResponse[0]) {
              videoid = videoResponse[0]?.id?.videoId;
              console.log("Video ID:", videoid); // Ensure the video ID is correct
            }

            // Now insert into DB with the videoId
            await db.insert(Chapters).values({
              chapterId: index,
              courseId: course?.courseId,
              content: content,
              videoId: videoid || null, // Insert null if videoId is not found
            });
          })
        );

        // Only after all chapters are generated and inserted, update and redirect
        await db.update(CourseList).set({ publish: true });
        router.replace("/create-course/" + course?.courseId + "/finish");
      } catch (e) {
        console.log("Error:", e);
      } finally {
        // Ensure loading is set to false even if there's an error
        setLoading(false);
      }
    } else {
      console.log("Chapters not found.");
      setLoading(false); // Also set loading to false if no chapters are found
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
  )
}

export default CoursePage;
