"use client"
import { useEffect, useState } from "react";
import { GoogleOneTap } from "@clerk/nextjs";

export default function GoogleOneTapWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <GoogleOneTap />;
}
