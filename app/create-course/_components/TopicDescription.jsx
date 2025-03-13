import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'

const TopicDescription = () => {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleInputChange=(fieldname,value)=>{
    setUserCourseInput(prev=>({
      ...prev,
      [fieldname]:value
    }))

  }
  return (
    <div className='mx-20 lg:mx-44'>
        {/* Topic */}
        <div className='mt-5'>
            <label>💡 Enter the Subject Name and topic for which you would generate a course on.</label>
            <Input placeholder={'Ex: Physics-Electricity'} onChange={(e)=>handleInputChange('topic',e.target.value)} defaultValue={userCourseInput?.topic}/>
        </div>
        <div className='mt-5'>
            <label>📝 Write a brief description of the topic(Optional)</label>
            <Textarea placeholder={'Description'}  onChange={(e)=>handleInputChange('description',e.target.value)} defaultValue={userCourseInput?.description}/>
        </div>



        {/* Description */}
    </div>
  )
}

export default TopicDescription