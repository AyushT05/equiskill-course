import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react';
import { PiPuzzlePieceBold } from "react-icons/pi";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Book, BookA, BookmarkCheck, NotebookPen } from 'lucide-react';

function CourseBasicInfo({ course, refreshData }) {
  const [selectedFile, setSelectedFile] = useState();
  const router = useRouter(); // Initialize useRouter

  // Function to handle button click
  const handleStartClick = () => {
    const courseId = course?.courseId; // Get the courseId from the course object
    if (courseId) {
      router.push(`/course/${courseId}/start`); // Redirect to the desired URL
    }
  };

  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <h2 className='font-bold text-2xl'>{course?.courseOutput?.["Name"]}
            <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} /> </h2>
          <p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.Description}</p>
          <div>
            <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'> <NotebookPen/>
              {course?.category} </h2>
            <Button className='w-full mt-5' onClick={handleStartClick}>Start</Button> {/* Add onClick handler */}
          </div>
        </div>
        <div>
          <label>
            <Image
              src='/course1.jpg'
              alt='photo'
              width={400}  // Replace with the actual width of your image
              height={300} // Replace with the actual height of your image
              className='w-full rounded-xl h-[250px] object-cover cursor-pointer flex items-center'
              style={{ objectFit: 'cover' }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
