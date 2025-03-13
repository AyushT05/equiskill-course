import React from 'react'
import { HiOutlineClock } from "react-icons/hi2";

function ChapterListCard({ chapter, index }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b transition-all hover:bg-purple-50">
      {/* Chapter Index */}
      <div className="w-10 h-10 flex items-center justify-center bg-primary text-white font-semibold rounded-full shadow-sm">
        {index + 1}
      </div>

      {/* Chapter Details */}
      <div className="flex-1">
        <h2 className="font-semibold text-gray-800">{chapter?.["Chapter Name"]}</h2>
        <h2 className="flex items-center gap-2 text-sm text-primary mt-1">
          <HiOutlineClock className="text-lg" /> {chapter?.Duration}
        </h2>
      </div>
    </div>
  );
}

export default ChapterListCard;
