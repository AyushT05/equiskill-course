"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { and, eq } from 'drizzle-orm';
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { CourseList } from '@/configs/schema';
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

function FinishPage({ params }) {
    const { user } = useUser();
    const resolvedParams = React.use(params);
    const courseId = resolvedParams?.courseId;
    
    const [course, setCourse] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (courseId && user?.primaryEmailAddress?.emailAddress) {
            getCourse();
        }
    }, [courseId, user]);

    const getCourse = async () => {
        if (!courseId) return;
        try {
            const result = await db
                .select()
                .from(CourseList)
                .where(
                    and(
                        eq(CourseList.courseId, courseId),
                        eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
                    )
                );
            if (result && result.length > 0) {
                setCourse(result[0]);
            }
            console.log(result);
        } catch (error) {
            console.error("Error fetching course:", error);
        }
    };

    const getFullUrl = () => {
        const host = process.env.NEXT_PUBLIC_HOST_NAME || "localhost:3019";
        const protocol = host.startsWith("http") ? "" : "http://";
        return `${protocol}${host}/course/${course?.courseId}`;
    };

    const handleCopy = async () => {
        const url = getFullUrl();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(url);
                alert("Course URL copied to clipboard!");
            } catch (err) {
                console.error("Clipboard copy failed:", err);
            }
        } else {
            // Fallback for non-secure HTTP contexts
            const textarea = document.createElement("textarea");
            textarea.value = url;
            textarea.style.position = "fixed"; // Keep hidden off-screen
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
                document.execCommand('copy');
                alert("Course URL copied to clipboard!");
            } catch (err) {
                console.error("Fallback copy failed:", err);
            }
            document.body.removeChild(textarea);
        }
    };
    
    return (
        <div className='px-10 md:px-20 lg:px-44 my-7'>
            <h2 className='text-center font-bold text-2xl my-3 text-primary'>Congrats! Your course is Ready</h2>
            <CourseBasicInfo course={course} refreshData={() => console.log()} />

            <h2 className='mt-3'>Course URL</h2>   
            <h2 className='text-center text-gray-400 border p-2 rounded flex gap-5 items-center justify-between'>
                <span className="truncate">{getFullUrl()}</span>
                <HiOutlineClipboardDocumentCheck 
                    className='h-8 w-8 text-primary cursor-pointer hover:scale-110 active:scale-95 transition-all'
                    onClick={handleCopy}
                />
            </h2> 
        </div>
    )
}

export default FinishPage