"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Equiskill-AI</h1>
      <Button className="mb-4">Click</Button>
      <div className="flex justify-center">
        {mounted ? <UserButton /> : <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />}
      </div>
    </div>
  );
}
