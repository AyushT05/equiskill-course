import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { CourseList } from '@/configs/schema';

function EditChapters({ course, index, refreshData }) {
    const Chapters = course?.courseOutput?.Chapters;
    const [Name, setName] = useState(''); // Initialize with empty string
    const [About, setAbout] = useState(''); // Initialize with empty string

    useEffect(() => {
        if (Chapters && Chapters[index]) { // Check if Chapters and Chapters[index] exist
            setName(Chapters[index]["Chapter Name"] || ''); // Use "Chapter Name" key
            setAbout(Chapters[index].About || '');
        }
    }, [course, index]); // Add index to the dependency array

    const onUpdateHandler = async () => {
        if (!Chapters || !Chapters[index]) return; // Check if Chapters and Chapters[index] exist

        // Update the course output with new values
        course.courseOutput.Chapters[index]["Chapter Name"] = Name; // Use "Chapter Name" key
        course.courseOutput.Chapters[index].About = About;

        try {
            const result = await db.update(CourseList).set({
                courseOutput: course?.courseOutput
            }).where(eq(CourseList?.id, course?.id))
            .returning({ id: CourseList.id });
            console.log(result);
            refreshData(true)
        } catch (error) {
            console.error("Error updating chapter:", error);
        }

        
    }

    return (
        <Dialog>
            <DialogTrigger>
            <div className="inline-flex items-center pl-2 mt-2 cursor-pointer text-gray-500 hover:text-primary">
               <FaEdit className="text-lg" />
                </div>
                </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Chapter</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Chapter Title</label>
                            <Input
                                value={Name} // Use the state variable Name
                                onChange={(event) => setName(event?.target.value)}
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <Textarea
                                className='h-40'
                                value={About} // Use the state variable About
                                onChange={(event) => setAbout(event?.target.value)}
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
    );
}

export default EditChapters;
