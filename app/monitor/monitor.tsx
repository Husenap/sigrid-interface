'use client';

import getDatabase from '@/app/monitor/actions';
import CourseList from '@/app/monitor/course-list';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/layouts/page-header';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Courses, databaseToCourses } from '@/lib/parser';
import { useEffect, useRef, useState } from 'react';

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
    div?.addEventListener('animationiteration', updateData);
    return () => {
      div?.removeEventListener('animationiteration', updateData);
    };
  }, []);

  return (
    <div className="relative">
      <div ref={loaderRef} className="animate-load fixed left-0 top-16 h-1 w-full bg-primary" />
      <PageHeader>
        <PageHeaderHeading>Sigrid Monitor</PageHeaderHeading>
        <PageHeaderDescription>Här kan du få en live överblick över trycket i alla salarna.</PageHeaderDescription>
      </PageHeader>
      <Separator className="my-4" />
      {courses ? (
        <CourseList courses={courses}></CourseList>
      ) : (
        <div className="space-y-2">
          <Skeleton className="h-16" />
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      )}
    </div>
  );
}
