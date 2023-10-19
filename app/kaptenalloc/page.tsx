'use client';

import { columns } from '@/app/kaptenalloc/(table)/columns';
import { DataTable } from '@/app/kaptenalloc/(table)/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { getKaptenAlloc } from './actions';

export type Row = {
  course: string;
  date: string;
  week: string;
  day: string;
  time: string;
  type: string;
  group: string;
  room: string;
  supervisor: string;
};

export type Data = {
  rows: Array<Row>;
};

function unescapeUnicode(text: string) {
  return text.replace(/\\u([\dA-Fa-f]{4})/g, (_, group1) => String.fromCharCode(parseInt(group1, 16)));
}

export default function Page() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const updateData = async () => {
      const newData = await getKaptenAlloc();
      const match = newData.match(/-+(?=\\n)\\n(.+)(?=\\n)\\n-+(?=\\n)\\n(?:(.+)(?=\\n)\\n)*/);
      if (match) {
        const rows: Array<Row> = match[2]
          .split('\\n')
          .map((s) => s.split('|').map((t) => t.trim()))
          .map(([course, date, day, time, type, group, room, supervisor]) => {
            const dateTime = DateTime.fromISO(`${date}T${time}`, { zone: 'Europe/Stockholm' });
            return {
              course,
              date: dateTime.toISODate()!,
              week: `v${dateTime.weekNumber.toString()}`,
              day,
              time,
              type: type.substring(0, 9),
              group,
              room,
              supervisor: unescapeUnicode(supervisor),
            };
          });
        setData({ rows });
      }
    };
    updateData();
  }, []);

  if (!data) {
    return (
      <div className="mx-auto w-full space-y-4 py-4">
        <div className="mx-auto w-full">
          <Skeleton className="mb-3 h-10 max-w-sm" />
          <Skeleton className="mx-auto h-96" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={data.rows} />
    </div>
  );
}
