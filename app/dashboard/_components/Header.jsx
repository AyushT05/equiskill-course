"use client";

import React, { useEffect, useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname

function Header() {
  const pathname = usePathname(); // Get the current URL path
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
      {/* Conditionally Render Logo */}
      {pathname !== "/dashboard" && ( 
        <Link href="/dashboard">
          <Image
            src="/student-station.png"  
            alt="Logo"
            width={200}
            height={80}
            className="cursor-pointer"
          />
        </Link>
      )}

      {/* User Button */}
      {mounted ? <UserButton /> : <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />}
    </div>
  );
}

export default Header;
