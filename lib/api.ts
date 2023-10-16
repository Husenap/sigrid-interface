'use server';

const BASE_URL = process.env.SIGRID_URL || '';

export async function apiCall(path: Array<string>, params: any) {
  const apiUrl = [BASE_URL, ...path].join('/');
  const searchParams = new URLSearchParams(params);
  const url = `${apiUrl}?${searchParams}`;

  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return await res.text();
}
