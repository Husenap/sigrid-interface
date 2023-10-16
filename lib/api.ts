export async function apiCall(path: Array<string>, params: any) {
  const res = await fetch('/api', {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({ path, params }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return await res.text();
}
