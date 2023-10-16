export const preferredRegion = 'arn1';

const BASE_URL = process.env.SIGRID_URL || '';

export async function POST(request: Request) {
  const { path, params } = await request.json();

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

  const page = await res.text();

  return new Response(page);
}
