import { BookOpenCheck, Bot, BotMessageSquare, ChartNoAxesColumnIncreasing, Globe, Languages, MessageCircle, MessageCircleQuestion, School } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

const user1 = "https://i.pravatar.cc/150?img=1";
const user2 = "https://i.pravatar.cc/150?img=2";
const user3 = "https://i.pravatar.cc/150?img=3";
const user4 = "https://i.pravatar.cc/150?img=4";
const user5 = "https://i.pravatar.cc/150?img=5";
const user6 = "https://i.pravatar.cc/150?img=6";

export const navItems = [
  { 
    label: "Features", 
    href: "#features" 
  },
  { 
    label: "Workflow", 
    href: "#workflow" 
  },
  { 
    label: "Pricing", 
    href: "#pricing" 
  },
  { 
    label: "Testimonials", 
    href: "#testimonials" 
  },
];


export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life.",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <Languages />,
    text: "Personalized Learning Paths",
    description:
      " Learn at your own pace with courses in your preferred regional language, created by top-tier professionals.",
  },
  {
    icon: <MessageCircleQuestion />,
    text: "Direct Instructor Interaction",
    description:
      "Connect directly with the course instructor to clarify doubts and get personalized guidance.",
  },
  {
    icon: <BookOpenCheck />,
    text: "AI-Powered Study Companion",
    description:
      "Conquer exams with AI-powered study tools. Equiskill-AI helps you create personalized notes, practice questions, quizzes, and flashcards.",
  },
  {
    icon: <ChartNoAxesColumnIncreasing />,
    text: "Learning for Everyone",
    description:
      "Whether you're a beginner or an expert, Equiskill-AI caters to all learning levels.",
  },
  {
    icon: <Globe />,
    text: "Seamless Learning Experience",
    description:
      "Enjoy uninterrupted learning across all your devices – desktops, laptops, and mobiles.",
  },
  {
    icon: <School />,
    text: "Quality Education for All",
    description:
      "Equiskill-AI brings high-quality education to every corner of the country.",
  },
];

export const checklistItems = [
  {
    title: "Become an Instructor",
    description: "Create and share your knowledge by building your own courses with the help of Equiskill-AI.",
  },
  {
    title: "AI-Powered Course Creation",
    description: "Utilize Equiskill-AI to easily create engaging course content, including videos, quizzes, and interactive elements.",
  },
  {
    title: "Chat with Notes: Summarization",
    description: "Easily summarize key concepts from instructor-provided notes with the 'Chat with Notes' feature.",
  },
  {
    title: "Chat with Notes: AI Explanation",
    description: "Deepen your understanding by having the 'Chat with Notes' feature provide AI-powered explanations of complex topics",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "Rs.0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "Rs.259",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "Rs.599",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
