"use client";

import getDatabase from "@/app/monitor/actions";
import { Room } from "@/lib/parser";
import { useEffect, useRef, useState } from "react";

type Courses = Record<string, Record<string, Array<Room>>>;

export default function Monitor() {
  const [courses, setCourses] = useState<Courses | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateData = async () => {
      getDatabase().then((database) => {
        const newCourses: Courses = {};
        database.rooms.forEach((room) => {
          ((newCourses[room.course] ??= {})[room.room] ??= []).push(room);
        });
        setCourses(newCourses);
      });
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
        className="absolute top-0 left-0 h-1 w-full animate-load bg-red-50"
      ></div>
      <pre>{JSON.stringify(courses, null, 2)}</pre>
    </div>
  );
}
