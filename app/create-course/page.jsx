'use client';
import React, { useState, useContext } from "react";
import {
  HiClipboardDocumentCheck,
  HiInboxStack,
  HiLightBulb,
  HiMiniSquares2X2
} from "react-icons/hi2";
import AddCourseButton from '../dashboard/_components/AddCourseButton';
import { Button } from "@/components/ui/button";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { useEffect } from "react";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import LoadingDialogue from "./_components/LoadingDialogue";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";




function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: 'Category',
      icon: <HiMiniSquares2X2 />
    },
    {
      id: 2,
      name: 'Topic & Desc',
      icon: <HiLightBulb />
    },
    {
      id: 3,
      name: 'Options',
      icon: <HiClipboardDocumentCheck />
    }
  ];
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const checkStatus = () => {
    if (!userCourseInput?.length == 0) return true;


    if (activeIndex === 0 && (!userCourseInput.category || userCourseInput.category.length === 0)) {
      return true;
    }
    if (activeIndex === 1 && (!userCourseInput.topic || userCourseInput.topic.length === 0)) {
      return true;
    }
    if (activeIndex === 2 &&
      (userCourseInput.level === undefined ||
        userCourseInput.duration === undefined ||
        userCourseInput.displayVideo === undefined ||
        userCourseInput.noOfChapters === undefined)
    ) {
      return true;
    }
    return false;
  };



  const GenerateCourseLayout = async () => {
    setLoading(true)

    const BASIC_PROMPT = 'Act as an expert curriculum designer. Generate a highly detailed academic Course Layout based on the following details. IMPORTANT: The course name, description, chapter titles, duration, and structure must be rigorous, comprehensive, and strictly tailored to the specified Category/Grade level (e.g., if category is "12th Class", the syllabus must match an advanced 12th-grade standard). Ensure chapters cover all foundational and advanced concepts necessary for exam preparation or deep study. Output must be in JSON format containing fields: CourseName, Description, and Chapters (an array where each chapter object contains ChapterName, Description, and Duration).'
    const USER_INPUT_PROMPT = ` Details: Category/Class: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Description: ${userCourseInput?.description}, Level/Difficulty: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOfChapters: ${userCourseInput?.noOfChapters}, Language: ${userCourseInput?.language}, Board/Syllabus: ${userCourseInput?.board} in JSON format`
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT
    console.log(FINAL_PROMPT);

    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(JSON.parse(result.response?.text()))
    setLoading(false)
    SaveCourseLayoutInDb(JSON.parse(result.response?.text()))


  }

  const SaveCourseLayoutInDb = async (courseLayout) => {
    var id = uuid4();
    setLoading(true)
    const res = await db.insert(CourseList).values({
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
      userProfileImage: user?.imageUrl
    })
    console.log("Finish");
    router.replace('/create-course/' + id)
    setLoading(false);



  }

  return (
    <div>
      <div className='flex flex-col justify-center items-center pt-5'>
        <h2 className='text-4xl text-[#003cb3] font-medium'>Generate a course with Equiskill-AI</h2>
        <div className='flex mt-10'>
          {StepperOptions.map((item, index) => (
            <div key={item.id} className='flex items-center'>
              <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                <div
                  className={`p-3 rounded-full text-white ${activeIndex >= index ? "bg-[#003cb3]" : "bg-gray-200"
                    }`}
                >
                  {item.icon}
                </div>
                <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
              </div>
              {index !== StepperOptions.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] rounded-full ${activeIndex > index ? "bg-[#003cb3]" : "bg-gray-300"
                    }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-45 mt-10">
        {activeIndex === 0 ? <SelectCategory /> :
          activeIndex === 1 ? <TopicDescription /> : <SelectOption />
        }
        <div className="flex justify-between mt-10">
          <Button
            variant="outline"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>
              Next
            </Button>
          )}
          {activeIndex === 2 && (
            <Button
              disabled={checkStatus()}
              onClick={GenerateCourseLayout}>
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingDialogue loading={loading} />
    </div>
  );
}

export default CreateCourse;
