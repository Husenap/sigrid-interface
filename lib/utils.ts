import { apiCall } from '@/lib/api';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function checkedApiCall(path: Array<string>, params: any) {
  const page = await apiCall(path, params);
  const error = page.match(/ERROR:\s*([^<]+)/);
  if (error) {
    throw new Error(error[1].trim());
  }
  return page;
}
