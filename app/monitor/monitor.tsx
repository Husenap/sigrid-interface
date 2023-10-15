"use client";

import getDatabase from "@/app/monitor/actions";
import CourseList from "@/app/monitor/course-list";
import { Courses, databaseToCourses } from "@/lib/parser";
import { useEffect, useRef, useState } from "react";

export default function Monitor() {
  const [courses, setCourses] = useState<Courses | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateData = async () => {
      const database = await getDatabase();
      setCourses(databaseToCourses(database));
    };
    updateData();

    const div = loaderRef.current;
    div?.addEventListener("animationiteration", updateData);
    return () => {
      div?.removeEventListener("animationiteration", updateData);
    };
  }, []);

  return (
    <div>
      <div
        ref={loaderRef}
        className="fixed top-0 left-0 h-1 w-full animate-load bg-primary"
      />
      {courses && <CourseList courses={courses}></CourseList>}
    </div>
  );
}
