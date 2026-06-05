'use client'
import { UserInputContext } from '@/app/_context/UserInputContext'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'
import { Lightbulb, FileText, Sparkles } from 'lucide-react'

const examples = [
  'Physics — Electricity & Magnetism',
  'Mathematics — Calculus',
  'Chemistry — Organic Reactions',
  'Computer Science — Data Structures',
]

const TopicDescription = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext)

  const handleInputChange = (fieldname, value) => {
    setUserCourseInput(prev => ({ ...prev, [fieldname]: value }))
  }

  return (
    <div className="px-4 md:px-10 lg:px-20">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-800">What would you like to learn?</h3>
        <p className="text-sm text-gray-500 mt-1">Enter a subject and topic to generate a personalized course</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">

        {/* Topic Input */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
              <Lightbulb size={17} className="text-purple-600" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-800">Subject & Topic <span className="text-red-400">*</span></label>
              <p className="text-xs text-gray-400">e.g. Subject — specific topic within it</p>
            </div>
          </div>
          <Input
            placeholder="Ex: Physics — Electricity"
            className="border-gray-200 bg-gray-50 rounded-xl text-sm focus:ring-purple-400"
            onChange={(e) => handleInputChange('topic', e.target.value)}
            defaultValue={userCourseInput?.topic}
          />
          {/* Quick-fill examples */}
          <div className="flex flex-wrap gap-2 mt-3">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => handleInputChange('topic', ex)}
                className="text-xs text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-100 px-2.5 py-1 rounded-lg transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Description Input */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
              <FileText size={17} className="text-purple-600" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-800">Additional Context <span className="text-gray-400 font-normal">(Optional)</span></label>
              <p className="text-xs text-gray-400">Any specific subtopics, exam focus, or details for the AI</p>
            </div>
          </div>
          <Textarea
            placeholder="e.g. Focus on exam preparation with solved examples, cover Ohm's Law, Kirchhoff's laws, and circuits..."
            className="border-gray-200 bg-gray-50 rounded-xl text-sm focus:ring-purple-400 resize-none min-h-[100px]"
            onChange={(e) => handleInputChange('description', e.target.value)}
            defaultValue={userCourseInput?.description}
          />
        </div>

        {/* Tip banner */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
          <Sparkles size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700 leading-relaxed">
            The more specific your topic, the better the generated course. Adding context in the description helps the AI tailor chapter depth to your exact needs.
          </p>
        </div>

      </div>
    </div>
  )
}

export default TopicDescription
