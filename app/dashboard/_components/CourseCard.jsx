"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiOutlineBookOpen, HiOutlineTrash } from 'react-icons/hi2';
import { db } from '@/configs/db';
import { CourseList, Chapters } from '@/configs/schema';
import { eq } from 'drizzle-orm';

function CourseCard({ course, onRefresh }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await db.delete(Chapters).where(eq(Chapters.courseId, course?.courseId));
      await db.delete(CourseList).where(eq(CourseList.courseId, course?.courseId));
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className="relative group shadow-md rounded-lg border p-4 cursor-pointer mt-4 w-full max-w-sm transition-all duration-300 hover:shadow-lg hover:border-primary hover:scale-105">
      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowConfirm(true);
        }}
        className="absolute top-6 right-6 z-10 p-2 bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-full shadow-md backdrop-blur-sm transition-all duration-200"
        title="Delete Course"
      >
        <HiOutlineTrash className="text-lg" />
      </button>

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
        <h2 className="font-semibold text-lg text-gray-800 group-hover:text-primary transition-colors">
          {course?.courseOutput?.Name || course?.courseOutput?.CourseName || course?.name}
        </h2>
        <p className="text-sm text-gray-500 my-1">{course?.category}</p>

        <div className="flex items-center justify-between mt-2">
          <h2 className="flex gap-2 items-center px-2 py-1 bg-purple-100 text-primary text-sm rounded-md">
            <HiOutlineBookOpen className="text-lg" /> {course?.courseOutput?.NoOfChapters || 0} Chapters
          </h2>
          <h2 className="text-sm bg-purple-100 text-primary px-2 py-1 rounded-md">{course?.level}</h2>
        </div>

        <div className="flex items-center mt-3">
          <h2 className="text-sm text-gray-600 font-medium">{course?.userName}</h2>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl border">
            <h3 className="font-semibold text-lg text-gray-900">Delete Course</h3>
            <p className="text-gray-500 text-sm mt-2">
              Are you sure you want to delete this course? This action cannot be undone and will delete all chapters and content.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowConfirm(false); }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition"
              >
                Cancel
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseCard;
