'use client'
import React, { useEffect, useState } from 'react';
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { and, eq } from 'drizzle-orm';
import ChapterContent from './_components/ChapterContent';
import Sidebar from './_components/SideBar';
import Header from '@/app/dashboard/_components/Header';

function CourseStart({ params: paramsPromise }) {
    const [params, setParams] = useState(null);
    const [course, setCourse] = useState();
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [chapterContent, setChapterContent] = useState();

    useEffect(() => {
        async function resolveParams() {
            const resolvedParams = await paramsPromise;
            setParams(resolvedParams);
        }
        resolveParams();
    }, [paramsPromise]);

    useEffect(() => {
        if (params?.courseId) {
            GetCourse(params.courseId);
        }
    }, [params]);

    const GetCourse = async (courseId) => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, courseId));

        setCourse(result[0]);
    }

    const GetSelectedChapterContent = async (chapterId) => {
        const result = await db.select().from(Chapters)
            .where(and(eq(Chapters.chapterId, chapterId), eq(Chapters.courseId, course?.courseId)));

        setChapterContent(result[0]);
        console.log(result);
    }

    return (
        <div className="h-screen flex flex-col">
            {/* Fixed Top Header */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                <Header />
            </div>

            {/* Main Content Section */}
            <div className="flex flex-grow pt-[72px]">
                {/* Sidebar Positioned Below Header */}
                <Sidebar
                    course={course}
                    selectedChapter={selectedChapter}
                    setSelectedChapter={setSelectedChapter}
                    GetSelectedChapterContent={GetSelectedChapterContent}
                />

                {/* Main Content Display */}
                <div className="md:ml-72 flex-grow overflow-y-auto h-[calc(100vh-72px)] p-4">
                    <ChapterContent chapter={selectedChapter} content={chapterContent} />
                </div>
            </div>
        </div>
    );
}

export default CourseStart;
