"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import Navbar from '@/components/landing/Navbar';
import Herosection from '@/components/landing/Herosection';
import Featuresec from '@/components/landing/Featuresec';
import Workflow from '@/components/landing/Workflow';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/landing/Footer';
import Pricing from '@/components/landing/Pricing';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={`flex flex-col min-h-screen bg-slate-50 ${montserrat.className}`}>
      <Navbar />
      <Herosection />

      <div className="flex-grow pt-15 px-6">
        <Featuresec />
        <Workflow />
        <Pricing />
        <Testimonials />
      </div>

      <Footer />
    </div>
  );
}
