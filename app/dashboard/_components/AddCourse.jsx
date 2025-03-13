"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import AddCourseButton from './AddCourseButton';


const AddCourse = () => {
    const {user} = useUser();
  
  return (
    <div className='flex items-center justify-between'>
        <div>
            <div className='text-2xl px-5 pt-5'>Hello, 
            <span className='font-bold'> {user?.firstName}</span></div>
            <p className='text-sm text-gray-500 pt-2 px-5'>Welcome to Equiskill-AI course generator. Create and publish a course with just a few clicks with AI. </p>
        </div>
        <div className='pr-5 pt-5'>
        <AddCourseButton/>
        </div>
    </div>
  )
}

export default AddCourse