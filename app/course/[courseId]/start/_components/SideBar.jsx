import React from 'react';
import ChapterListCard from '../_components/ChapterListCard';
import goBack from './GoBack';

function Sidebar({ course, selectedChapter, setSelectedChapter, GetSelectedChapterContent }) {
    return (
        <div className="absolute top-[72px] md:w-72 hidden md:flex h-[calc(100vh-72px)] border-r shadow-md bg-white flex-col">
            {/* Fixed Header */}
            <h2 className="font-semibold text-lg bg-primary p-4 text-white text-center shadow-sm pt-10">
                {course?.courseOutput?.Name}
            </h2>

            {/* Scrollable Chapter List */}
            <div className="flex-grow overflow-y-auto max-h-[calc(100vh-120px)] px-2 py-2 space-y-2">
                {course?.courseOutput?.Chapters.map((chapter, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer rounded-lg p-3 transition-all duration-200 text-gray-700 font-medium shadow-sm border
                            ${selectedChapter?.name === chapter?.name ? 'bg-purple-100 border-purple-300' : 'bg-white hover:bg-purple-50'}`}
                        onClick={() => {
                            setSelectedChapter(chapter);
                            GetSelectedChapterContent(index);
                        }}
                    >
                        <ChapterListCard chapter={chapter} index={index} />
                    </div>
                ))}
            </div>

            {/* Back Button */}
            <div className="p-4 border-t bg-gray-100 flex justify-center">
                {goBack()}
            </div>
        </div>
    );
}

export default Sidebar;
