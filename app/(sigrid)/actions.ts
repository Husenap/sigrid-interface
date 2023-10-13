"use server";

import { StudentAuthState, StudentState, apiCall } from "@/lib/api";

export async function login(name: string, course: string, room: string) {
  const res = await apiCall(["sigrid", "login"], {
    name,
    course,
    room,
    state: "work",
  });

  const page = await res.text();
  const matches = page.matchAll(
    /type="hidden" name="([^"]*)" value="([^"]*)"/g
  );

  const authState: Record<string, string> = {};
  for (const match of matches) {
    authState[match[1]] = match[2];
  }
  return { ...authState, state: "work" } as StudentAuthState;
}

export async function update(auth: StudentAuthState, state: StudentState) {
  await apiCall(["sigrid", "update"], {
    ...auth,
    state: state,
  });
}

export async function exit(auth: StudentAuthState) {
  await apiCall(["sigrid", "update"], {
    ...auth,
    state: "exit",
  });
}
