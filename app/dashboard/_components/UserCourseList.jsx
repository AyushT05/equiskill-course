"use client"
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import CourseCard from './CourseCard';

function UserCourseList() {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            getUserCourses();
        }
    }, [user]);

    const getUserCourses = async () => {
        setLoading(true);
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress));
        setCourseList(result);
        setLoading(false);
    };

    return (
        <div className='mt-10 p-4'>
            <h2 className='font-medium text-2xl mb-4'>My AI Courses</h2>
            {loading ? (
                <div className="text-gray-500">Loading your courses...</div>
            ) : courseList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {courseList.map((course, index) => (
                        <CourseCard
                            course={course}
                            key={index}
                            onRefresh={getUserCourses}
                            userEmail={user?.primaryEmailAddress?.emailAddress}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-gray-500">You have no courses yet.</div>
            )}
        </div>
    );
}

export default UserCourseList;