'use client';
import React, { useContext } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { UserInputContext } from '@/app/_context/UserInputContext';
import {
    BarChart2,
    Clock,
    PlaySquare,
    BookOpen,
    Globe,
    GraduationCap,
} from 'lucide-react';

const fields = [
    {
        key: 'level',
        icon: BarChart2,
        label: 'Difficulty Level',
        placeholder: 'Select difficulty',
        type: 'select',
        options: ['Beginner', 'Intermediate', 'Advanced'],
    },
    {
        key: 'duration',
        icon: Clock,
        label: 'Course Duration',
        placeholder: 'Select duration',
        type: 'select',
        options: ['1 hour', '2 hours', '2+ hours'],
    },
    {
        key: 'displayVideo',
        icon: PlaySquare,
        label: 'Include Video',
        placeholder: 'Include video lessons?',
        type: 'select',
        options: ['Yes', 'No'],
    },
    {
        key: 'noOfChapters',
        icon: BookOpen,
        label: 'Number of Chapters',
        placeholder: 'e.g. 5',
        type: 'number',
    },
    {
        key: 'language',
        icon: Globe,
        label: 'Language',
        placeholder: 'Select language',
        type: 'select',
        options: [
            'English', 'Hindi', 'Kannada', 'Tamil', 'Telugu',
            'Malayalam', 'Bengali', 'Gujarati', 'Marathi',
            'Punjabi', 'Odia',
        ],
    },
    {
        key: 'board',
        icon: GraduationCap,
        label: 'Board / Syllabus',
        placeholder: 'Select board',
        type: 'select',
        options: [
            'CBSE', 'ICSE', 'KSEEB', 'BSEB', 'MSBSHSE',
            'UPMSP', 'PSEB', 'RBSE', 'GSEB', 'JKBOSE',
            'HPBOSE', 'BIEAP', 'BSEAP', 'CHSE',
        ],
    },
];

const SelectOption = () => {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleInputChange = (fieldname, value) => {
        setUserCourseInput(prev => ({ ...prev, [fieldname]: value }));
    };

    return (
        <div className="px-4 md:px-10 lg:px-20">
            <div className="mb-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800">Course Preferences</h3>
                <p className="text-sm text-gray-500 mt-1">Customize how your course will be structured</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {fields.map(({ key, icon: Icon, label, placeholder, type, options }) => (
                    <div
                        key={key}
                        className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-200"
                    >
                        {/* Icon + Label */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                                <Icon size={17} className="text-purple-600" />
                            </div>
                            <label className="text-sm font-medium text-gray-700">{label}</label>
                        </div>

                        {/* Input */}
                        {type === 'select' ? (
                            <Select
                                onValueChange={(value) => handleInputChange(key, value)}
                                defaultValue={userCourseInput[key]}
                            >
                                <SelectTrigger className="w-full border-gray-200 bg-gray-50 focus:ring-purple-400 rounded-xl text-sm">
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.map((opt) => (
                                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : (
                            <Input
                                type="number"
                                placeholder={placeholder}
                                min={1}
                                max={20}
                                className="border-gray-200 bg-gray-50 focus:ring-purple-400 rounded-xl text-sm"
                                onChange={(e) => handleInputChange(key, e.target.value)}
                                defaultValue={userCourseInput[key]}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectOption;
