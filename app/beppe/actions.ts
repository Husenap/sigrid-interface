import { checkedApiCall } from '@/lib/utils';

export type SupervisorState =
  | 'supervising'
  | 'pophelp'
  | 'popready'
  | 'clearhelp'
  | 'clearready'
  | 'removeuser'
  | 'mergeroom'
  | 'gone'
  | 'purge';
export type SupervisorAuthState = {
  userid: string;
  course: string;
  room: string;
  state: SupervisorState;
};

export async function login(name: string, course: string, room: string) {
  const page = await checkedApiCall(['beppe', 'login'], {
    name,
    course,
    room,
    state: 'supervising',
  });

  const matches = page.matchAll(/type="hidden" name="([^"]*)" value="([^"]*)"/g);

  const authState: Record<string, string> = {};
  for (const match of matches) {
    authState[match[1]] = match[2];
  }
  return { ...authState, state: 'supervising' } as SupervisorAuthState;
}

export async function update(auth: SupervisorAuthState, state: SupervisorState, params?: any) {
  await checkedApiCall(['beppe', 'update'], {
    ...auth,
    state,
    ...params,
  });
}
