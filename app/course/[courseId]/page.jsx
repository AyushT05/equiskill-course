"use client"
import Header from '@/app/dashboard/_components/Header'
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList'
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail'

function Course({ params }) {
    const [course, setCourse] = useState();
    const courseId = React.use(params).courseId; // Unwrap params using React.use()

    useEffect(() => {
        if (courseId) {
            GetCourse();
        }
    }, [courseId]);

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, courseId));

        setCourse(result[0]);
        console.log(result);
    }

    return (
        <div>
            <Header />
            <div className='px-10 p-10 md:px-20 lg:px-44'>
                <CourseBasicInfo course={course} edit={false} />
                <CourseDetail course={course} />
                <ChapterList course={course} edit={false} />
            </div>
        </div>
    )
}

export default Course;
