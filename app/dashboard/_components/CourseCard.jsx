"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiOutlineBookOpen, HiOutlineTrash } from 'react-icons/hi2';
import { db } from '@/configs/db';
import { CourseList, Chapters } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { Share2, Copy, Check, X } from 'lucide-react';

function CourseCard({ course, onRefresh, userEmail }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const isOwner = userEmail && course?.createdBy && userEmail === course.createdBy;

  // ── URL helper: always uses the real origin, never hardcoded localhost ──
  const getCourseUrl = () => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/course/${course?.courseId}`;
  };

  const handleCopy = async (e) => {
    e.stopPropagation();
    const url = getCourseUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDelete = async () => {
    try {
      await db.delete(Chapters).where(eq(Chapters.courseId, course?.courseId));
      await db.delete(CourseList).where(eq(CourseList.courseId, course?.courseId));
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div className="relative group shadow-sm rounded-2xl border border-gray-100 bg-white cursor-pointer mt-4 w-full max-w-sm transition-all duration-300 hover:shadow-lg hover:border-purple-200 hover:-translate-y-0.5 overflow-hidden">

        {/* Top-right action buttons */}
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          {/* Share button */}
          <button
            onClick={(e) => { e.stopPropagation(); setShowShare(true); }}
            className="p-2 bg-white/90 hover:bg-purple-50 text-gray-500 hover:text-purple-600 rounded-full shadow-md backdrop-blur-sm transition-all duration-200"
            title="Share Course"
          >
            <Share2 size={15} />
          </button>

          {/* Delete button — owner only */}
          {isOwner && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowConfirm(true); }}
              className="p-2 bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full shadow-md backdrop-blur-sm transition-all duration-200"
              title="Delete Course"
            >
              <HiOutlineTrash size={15} />
            </button>
          )}
        </div>

        <Link href={'/course/' + course?.courseId} className="block">
          <div className="overflow-hidden">
            <Image
              alt="Course Image"
              src='/courses.jpg'
              width={300}
              height={200}
              className="w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="p-4">
          <p className="text-xs font-medium text-purple-500 uppercase tracking-wide mb-1">{course?.category}</p>
          <h2 className="font-semibold text-base text-gray-800 leading-snug line-clamp-2 group-hover:text-purple-700 transition-colors">
            {course?.courseOutput?.Name || course?.courseOutput?.CourseName || course?.name}
          </h2>

          <div className="flex items-center justify-between mt-3">
            <span className="flex gap-1.5 items-center text-xs px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg font-medium">
              <HiOutlineBookOpen className="text-sm" />
              {course?.courseOutput?.Chapters?.length || course?.courseOutput?.NoOfChapters || 0} Chapters
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-medium">{course?.level}</span>
          </div>

          <div className="flex items-center mt-3 pt-3 border-t border-gray-50">
            <p className="text-xs text-gray-400">{course?.userName}</p>
          </div>
        </div>
      </div>

      {/* ── Share Modal ── */}
      {showShare && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowShare(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">Share Course</h3>
                <p className="text-xs text-gray-500 mt-0.5">Anyone with this link can view the course</p>
              </div>
              <button
                onClick={() => setShowShare(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
              <span className="text-sm text-gray-600 truncate flex-1 font-mono">
                {typeof window !== 'undefined' ? `${window.location.origin}/course/${course?.courseId}` : ''}
              </span>
              <button
                onClick={handleCopy}
                className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                  copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl border">
            <h3 className="font-semibold text-lg text-gray-900">Delete Course</h3>
            <p className="text-gray-500 text-sm mt-2">
              Are you sure? This will permanently delete the course and all its chapters.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={(e) => { e.stopPropagation(); setShowConfirm(false); }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseCard;
