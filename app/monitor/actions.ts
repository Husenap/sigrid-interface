'use server';

import { apiCall } from '@/lib/api';
import { Database, parse } from '@/lib/parser';

let cache: {
  database: Database;
  date: number;
} | null = null;

export default async function getDatabase() {
  if (cache && Date.now() - cache.date < 5000) {
    console.log('Returning cached data');
    return cache.database;
  } else {
    const res = await apiCall(['sigrid', 'monitor'], {});
    const page = await res.text();
    const database = await parse(page);

    cache = {
      database,
      date: Date.now(),
    };

    console.log('Returning fresh data');
    return database;
  }
}
