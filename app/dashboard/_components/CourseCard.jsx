import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiOutlineBookOpen } from 'react-icons/hi2';

function CourseCard({ course }) {
  return (
    <div className="relative group shadow-md rounded-lg border p-4 cursor-pointer mt-4 w-full max-w-sm transition-all duration-300 hover:shadow-lg hover:border-primary hover:scale-105">
      <Link href={'/course/' + course?.courseId} className="block">
        <div className="overflow-hidden rounded-lg">
          <Image
            alt="Course Image"
            src='/courses.jpg'
            width={300}
            height={200}
            className="w-full h-[200px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </Link>
      <div className="p-3">
        <h2 className="font-semibold text-lg text-gray-800 group-hover:text-primary transition-colors">{course?.courseOutput?.Name}</h2>
        <p className="text-sm text-gray-500 my-1">{course?.category}</p>

        <div className="flex items-center justify-between mt-2">
          <h2 className="flex gap-2 items-center px-2 py-1 bg-purple-100 text-primary text-sm rounded-md">
            <HiOutlineBookOpen className="text-lg" /> {course?.courseOutput?.NoOfChapters} Chapters
          </h2>
          <h2 className="text-sm bg-purple-100 text-primary px-2 py-1 rounded-md">{course?.level}</h2>
        </div>

        <div className="flex items-center mt-3">
          <h2 className="text-sm text-gray-600 font-medium">{course?.userName}</h2>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
