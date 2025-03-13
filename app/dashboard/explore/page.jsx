"use client"
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import React, { useEffect, useState } from 'react';
import CourseCard from '../_components/CourseCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);

  const GetAllCourse = async () => {
    const result = await db.select().from(CourseList).limit(9).offset(pageIndex * 9);
    setCourseList(result);
    console.log(result);
  };

  return (
    <div className="px-6 py-10">
      <h2 className='font-bold text-4xl text-gray-900 text-center mb-2'>Explore More Projects</h2>
      <p className='text-center text-gray-500 mb-8'>Discover AI-powered projects created by the community.</p>

      {/* Grid Container */}
      <motion.div 
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {courseList?.length > 0 ? (
          courseList.map((course, index) => (
            <motion.div 
              key={course.id || index} 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))
        ) : (
          [1, 2, 3, 4, 5].map((item, index) => (
            <div 
              key={index} 
              className='w-full h-[230px] bg-gray-200 rounded-lg animate-pulse'
            ></div>
          ))
        )}
      </motion.div>

      {/* Pagination Controls */}
      <div className='flex justify-center gap-4 mt-8'>
        {pageIndex > 0 && (
          <Button 
            onClick={() => setPageIndex(pageIndex - 1)} 
            className='bg-primary text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary-dark transition-all duration-300'
          >
            Previous Page
          </Button>
        )}
        <Button 
          onClick={() => setPageIndex(pageIndex + 1)} 
          className='bg-primary text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary-dark transition-all duration-300'
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}

export default Explore;
