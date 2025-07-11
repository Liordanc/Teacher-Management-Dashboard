"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Providers } from "@/app/src/store/providers";

// Dynamically import TeacherProfile (client-only)
const TeacherProfile = dynamic(
  () => import("@/app/src/components/teacher-profile"),
  { ssr: false }
);

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure this only renders on the client
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Avoid hydration mismatch

  return (
    <Providers>
      <TeacherProfile />
    </Providers>
  );
}
