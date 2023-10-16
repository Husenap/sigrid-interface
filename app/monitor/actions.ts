import { apiCall } from '@/lib/api';
import { parse } from '@/lib/parser';

export default async function getDatabase() {
  const page = await apiCall(['sigrid', 'monitor'], {});
  const database = await parse(page);

  return database;
}
