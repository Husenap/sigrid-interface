'use server';

const BASE_URL = process.env.KAPTENALLOC_URL || '';

export async function getKaptenAlloc() {
  const res = await fetch(BASE_URL, {
    method: 'GET',
    cache: 'no-cache',
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const page = await res.text();

  return page;
}
