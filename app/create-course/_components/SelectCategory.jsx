"use client"

import CategoryList from '@/app/_shared/CategoryList' // Ensure this is an array or import correctly
import Image from 'next/image'
import React, { useContext } from 'react'
import { UserInputContext } from '@/app/_context/UserInputContext'


const SelectCategory = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleCategoryChange = (category) => {
    setUserCourseInput(prev => ({
      ...prev,
      category: category
    }))
  }
  return (
    <div className='px-10 md:px-20 py-10'><h2 className='my-5'>📒 Select the Course Category</h2>
      <div className='grid grid-cols-4 gap-4 '>

        {CategoryList?.map((item, index) => (
          <div
            key={item.id || index} // Add a unique key here
            className={`flex flex-col items-center border p-5 rounded-xl hover:border-[#003cb3] hover:bg-[#cce6ff] cursor-pointer ${userCourseInput?.category === item.name && 'border-[#003cb3] bg-[#cce6ff]'
              }`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image src={item.icon} alt={item.name} width={50} height={50} />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectCategory
