'use client';
import React, { useState, useContext, useEffect } from "react";
import { Layers, Lightbulb, SlidersHorizontal, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import LoadingDialogue from "./_components/LoadingDialogue";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: 0, name: 'Grade / Category', short: 'Category', icon: Layers, desc: 'Choose your class level' },
  { id: 1, name: 'Subject & Topic',  short: 'Topic',    icon: Lightbulb, desc: 'What to learn' },
  { id: 2, name: 'Preferences',      short: 'Options',  icon: SlidersHorizontal, desc: 'Customize the course' },
];

function CreateCourse() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const isNextDisabled = () => {
    if (activeIndex === 0) return !userCourseInput?.category;
    if (activeIndex === 1) return !userCourseInput?.topic;
    if (activeIndex === 2) return (
      !userCourseInput?.level ||
      !userCourseInput?.duration ||
      !userCourseInput?.displayVideo ||
      !userCourseInput?.noOfChapters
    );
    return false;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);
    const PROMPT = `Act as an expert curriculum designer. Generate a highly detailed academic Course Layout. The course name, description, chapter titles, duration, and structure must be rigorous and strictly tailored to the specified Category/Grade level. Output JSON with fields: CourseName, Description, and Chapters (array of objects with ChapterName, Description, Duration). Details — Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Description: ${userCourseInput?.description}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, Chapters: ${userCourseInput?.noOfChapters}, Language: ${userCourseInput?.language}, Board: ${userCourseInput?.board}`;
    const result = await GenerateCourseLayout_AI.sendMessage(PROMPT);
    const layout = JSON.parse(result.response?.text());
    setLoading(false);
    SaveCourseLayoutInDb(layout);
  };

  const SaveCourseLayoutInDb = async (courseLayout) => {
    const id = uuid4();
    setLoading(true);
    await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      level: userCourseInput?.level,
      category: userCourseInput?.category,
      language: userCourseInput?.language,
      board: userCourseInput?.board,
      includeVideo: userCourseInput?.displayVideo,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userProfileImage: user?.imageUrl,
    });
    router.replace('/create-course/' + id);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/60">

      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Sparkles size={18} className="text-purple-500" />
          <h1 className="text-2xl font-bold text-gray-900">Create a New Course</h1>
        </div>
        <p className="text-sm text-gray-500">Let AI build a personalized course for you in seconds</p>
      </div>

      {/* ── Stepper ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = activeIndex > index;
            const isActive = activeIndex === index;
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted ? 'bg-purple-500 text-white shadow-md shadow-purple-200'
                      : isActive   ? 'bg-purple-600 text-white shadow-md shadow-purple-200 ring-4 ring-purple-100'
                      :              'bg-gray-100 text-gray-400'}`}
                  >
                    {isCompleted
                      ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      : <Icon size={16} />
                    }
                  </div>
                  <div className="text-center hidden sm:block">
                    <p className={`text-xs font-semibold ${isActive ? 'text-purple-700' : isCompleted ? 'text-purple-500' : 'text-gray-400'}`}>
                      {step.short}
                    </p>
                    <p className="text-[10px] text-gray-400">{step.desc}</p>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-3 rounded-full transition-all duration-500 ${activeIndex > index ? 'bg-purple-400' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Step Content ── */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          {activeIndex === 0 && <SelectCategory />}
          {activeIndex === 1 && <TopicDescription />}
          {activeIndex === 2 && <SelectOption />}
        </div>

        {/* ── Nav Buttons ── */}
        <div className="flex items-center justify-between mt-6 px-1">
          <Button
            variant="outline"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(i => i - 1)}
            className="flex items-center gap-2 rounded-xl border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-700 disabled:opacity-30"
          >
            <ChevronLeft size={16} /> Back
          </Button>

          <span className="text-xs text-gray-400">Step {activeIndex + 1} of {STEPS.length}</span>

          {activeIndex < 2 ? (
            <Button
              disabled={isNextDisabled()}
              onClick={() => setActiveIndex(i => i + 1)}
              className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-6"
            >
              Next <ChevronRight size={16} />
            </Button>
          ) : (
            <Button
              disabled={isNextDisabled()}
              onClick={GenerateCourseLayout}
              className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-6"
            >
              <Sparkles size={15} /> Generate Course
            </Button>
          )}
        </div>
      </div>

      <LoadingDialogue loading={loading} />
    </div>
  );
}

export default CreateCourse;
