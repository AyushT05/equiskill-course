"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { and, eq } from 'drizzle-orm';
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { CourseList } from '@/configs/schema';
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";




function FinishPage( {params: paramsPromise }) {
    const { user } = useUser();
    const [course, setCourse] = useState([]);
    const [params, setParams] = useState(null);
   
    const router=useRouter();
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
    
  return (
    
        <div className='px-10 md:px-20 lg:px-44 my-7'>
        <h2 className='text-center font-bold text-2xl my-3 text-primary'>Congrats! Your course is Ready</h2>
        <CourseBasicInfo course={course} refreshData={()=>console.log()} />

        <h2 className='mt-3'>Course URL</h2>   
        <h2 className='text-center text-gray-400
         border p-2 round flex gap-5 items-center'>
        {process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
        <HiOutlineClipboardDocumentCheck className='h-8 w-5 cursor-pointer '
        onClick={async()=>await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_NAME+"/course/view/"+course?.courseId)}/>
        </h2> 
    </div>
  )
}

export default FinishPage