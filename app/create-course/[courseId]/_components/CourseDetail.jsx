import React from 'react';
import { HiOutlineChartBar } from "react-icons/hi2";
import { HiOutlineBookOpen } from "react-icons/hi";
import { LuClock3 } from "react-icons/lu";
import { MdLanguage } from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";

function CourseDetail({ course }) {
    return (
        <div className='border p-6 rounded-xl shadow-md mt-3 bg-white'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                
                {/* Skill Level */}
                <div className='flex items-center gap-3 p-4 border rounded-lg shadow-sm bg-gray-50'>
                    <HiOutlineChartBar className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-sm text-gray-500'>Skill Level</h2>
                        <h2 className='font-semibold text-lg text-gray-800'>{course?.level || "N/A"}</h2>
                    </div>
                </div>

                {/* Duration */}
                <div className='flex items-center gap-3 p-4 border rounded-lg shadow-sm bg-gray-50'>
                    <LuClock3 className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-sm text-gray-500'>Duration</h2>
                        <h2 className='font-semibold text-lg text-gray-800'>{course?.courseOutput?.Duration || "N/A"}</h2>
                    </div>
                </div>

                {/* No of Chapters */}
                <div className='flex items-center gap-3 p-4 border rounded-lg shadow-sm bg-gray-50'>
                    <HiOutlineBookOpen className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-sm text-gray-500'>No of Chapters</h2>
                        <h2 className='font-semibold text-lg text-gray-800'>{course?.courseOutput?.NoOfChapters || "N/A"}</h2>
                    </div>
                </div>

                {/* Video Included */}
                <div className='flex items-center gap-3 p-4 border rounded-lg shadow-sm bg-gray-50'>
                    <HiOutlineChartBar className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-sm text-gray-500'>Video Included</h2>
                        <h2 className='font-semibold text-lg text-gray-800'>{course?.includeVideo ? "Yes" : "No"}</h2>
                    </div>
                </div>

                {/* Language */}
                <div className='flex items-center gap-3 p-4 border rounded-lg shadow-sm bg-gray-50'>
                    <MdLanguage className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-sm text-gray-500'>Language</h2>
                        <h2 className='font-semibold text-lg text-gray-800'>{course?.language || "N/A"}</h2>
                    </div>
                </div>

                {/* Board */}
                <div className='flex items-center gap-3 p-4 border rounded-lg shadow-sm bg-gray-50'>
                    <IoSchoolOutline className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-sm text-gray-500'>Board</h2>
                        <h2 className='font-semibold text-lg text-gray-800'>{course?.board || "N/A"}</h2>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CourseDetail;
