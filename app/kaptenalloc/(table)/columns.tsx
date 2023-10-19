'use client';

import { Row } from '@/app/kaptenalloc/page';
import { ColumnDef } from '@tanstack/react-table';

export const columns: Array<ColumnDef<Row>> = [
  {
    id: 'course',
    accessorKey: 'course',
    header: 'Kurs',
  },
  {
    id: 'date',
    accessorKey: 'date',
    header: 'Datum',
  },
  {
    id: 'week',
    accessorKey: 'week',
    header: 'Vecka',
  },
  {
    id: 'day',
    accessorKey: 'day',
    header: 'Dag',
  },
  {
    id: 'time',
    accessorKey: 'time',
    header: 'Tid',
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: 'Typ',
  },
  {
    id: 'group',
    accessorKey: 'group',
    header: 'Grupp',
  },
  {
    id: 'room',
    accessorKey: 'room',
    header: 'Rum',
  },
  {
    id: 'supervisor',
    accessorKey: 'supervisor',
    header: 'Handledare',
  },
];
