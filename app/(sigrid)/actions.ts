import { apiCall } from '@/lib/api';

export type StudentState = 'work' | 'help' | 'ready' | 'exit';
export type StudentAuthState = {
  userid: string;
  course: string;
  room: string;
  state: StudentState;
};

export async function login(name: string, course: string, room: string) {
  const page = await apiCall(['sigrid', 'login'], {
    name,
    course,
    room,
    state: 'work',
  });

  const matches = page.matchAll(/type="hidden" name="([^"]*)" value="([^"]*)"/g);

  const authState: Record<string, string> = {};
  for (const match of matches) {
    authState[match[1]] = match[2];
  }
  return { ...authState, state: 'work' } as StudentAuthState;
}

export async function update(auth: StudentAuthState, state: StudentState) {
  await apiCall(['sigrid', 'update'], {
    ...auth,
    state: state,
  });
}
