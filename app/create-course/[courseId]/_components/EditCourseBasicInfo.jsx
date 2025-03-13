import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { CourseList } from '@/configs/schema';

function EditCourseBasicInfo({course,refreshData}) {
   const [Name,setName] = useState('');
   const [Discription,setDiscription] = useState('');

   useEffect(()=>{
    if (course?.courseOutput) {
        setName(course?.courseOutput?.Name || '');
        setDiscription(course?.courseOutput?.Description || '');
    }
    },[course]);

   const onUpdateHandler=async()=>{
    if (!course?.courseOutput) return; // prevent update if courseOutput is undefined

    course.courseOutput.Name=Name;
    course.courseOutput.Description=Discription;
    const  result = await db.update(CourseList).set({
         courseOutput:course?.courseOutput
    }).where(eq(CourseList?.id,course?.id))
    .returning({id:CourseList.id});
    console.log(result);
    refreshData(true)
   }

  return (
    <Dialog>
    <DialogTrigger>
      <div className="inline-flex items-center pl-2 pt-1 cursor-pointer text-gray-500 hover:text-primary">
        <FaEdit className="text-lg" />
      </div>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Course Title & Description</DialogTitle>
        <DialogDescription>
          <div className='mt-3'>
            <label>Course Title</label>
            <Input
              value={Name}
              onChange={(event) => setName(event?.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <Textarea
              className='h-40'
              value={Discription}
              onChange={(event) => setDiscription(event?.target.value)}
            />
          </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>
          <Button onClick={onUpdateHandler}>Update</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  

  )
}

export default EditCourseBasicInfo
