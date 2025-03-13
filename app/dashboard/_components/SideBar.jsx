"use client";
import Image from 'next/image';
import React, { useContext } from 'react';
import { HiHome } from "react-icons/hi2";
import { MdOutlineExplore } from "react-icons/md";
import { GrUpgrade } from "react-icons/gr";
import { TbLogout2 } from "react-icons/tb";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress";
import { BsFillSuitcaseLgFill } from "react-icons/bs";

const SideBar = () => {
    const Menu = [
        {
          id: 1,
          name: 'Home',
          icon: <HiHome />,
          path: '/dashboard',
        },
        {
          id: 2,
          name: 'Explore',
          icon: <MdOutlineExplore />,
          path: '/dashboard/explore',
        },
      ];
    
      const path = usePathname();
  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
     <div className="flex justify-center mb-6"> {/* Centering container */}
       <Image 
         alt="placeholder"  
         src='/student-station.png' 
         width={200} 
         height={160} 
       />
     </div>
     <hr className="my-5 mt-6" />
     <ul>
      {Menu.map((item) => (
        <li key={item.id}>
          <Link href={item.path}>
            <div
              className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3 ${
                item.path === path && 'bg-gray-100 text-black'
              }`}
            >
              <div className="text-2xl">{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        </li>
      ))}
    </ul>
    </div>
  )
}

export default SideBar
