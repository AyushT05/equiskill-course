"use client"

import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image'
import React, { useContext } from 'react'
import { UserInputContext } from '@/app/_context/UserInputContext'
import { Check } from 'lucide-react'

const SelectCategory = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput(prev => ({ ...prev, category }))
  }

  return (
    <div className="px-4 md:px-10 lg:px-20">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-800">Select Grade / Category</h3>
        <p className="text-sm text-gray-500 mt-1">Choose the class or level this course is designed for</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {CategoryList?.map((item) => {
          const isSelected = userCourseInput?.category === item.name;
          return (
            <button
              key={item.id}
              onClick={() => handleCategoryChange(item.name)}
              className={`relative flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer
                ${isSelected
                  ? 'border-purple-500 bg-purple-50 shadow-md shadow-purple-100'
                  : 'border-gray-100 bg-white hover:border-purple-200 hover:bg-purple-50/50 hover:shadow-sm'
                }`}
            >
              {/* Selected checkmark */}
              {isSelected && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                  <Check size={11} className="text-white" strokeWidth={3} />
                </span>
              )}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-purple-100' : 'bg-gray-50'}`}>
                <Image src={item.icon} alt={item.name} width={36} height={36} className="object-contain" />
              </div>
              <span className={`text-xs font-medium text-center leading-tight ${isSelected ? 'text-purple-700' : 'text-gray-600'}`}>
                {item.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SelectCategory
