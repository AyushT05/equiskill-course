"use client"
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import CourseCard from './CourseCard';

function UserCourseList() {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            getUserCourses();
        }
    }, [user]);

    const getUserCourses = async () => {
        setLoading(true); // Set loading to true while fetching
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress));

        setCourseList(result);
        setLoading(false); // Set loading to false after fetching
    };

    return (
        <div className='mt-10 p-4'>
            <h2 className='font-medium text-2xl mb-4'>My AI Courses</h2>
            {loading ? ( // Show loading state
                <div className="text-gray-500">Loading your courses...</div>
            ) : courseList.length > 0 ? ( // Check if there are courses
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {courseList.map((course, index) => (
                        <CourseCard course={course} key={index} />
                    ))}
                </div>
            ) : (
                <div className="text-gray-500">You have no courses yet.</div> // Empty state message
            )}
        </div>
    );
}

export default UserCourseList;
