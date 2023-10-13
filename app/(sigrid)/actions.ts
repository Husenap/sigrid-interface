"use server";

import { StudentAuthState, apiCall } from "@/lib/api";

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
  return authState as StudentAuthState;
}

export async function update(auth: StudentAuthState, state: string) {
  const res = await apiCall(["sigrid", "update"], {
    ...auth,
    state: state,
  });
}

export async function work(auth: StudentAuthState) {
  update(auth, "work");
}
export async function help(auth: StudentAuthState) {
  update(auth, "help");
}
export async function ready(auth: StudentAuthState) {
  update(auth, "ready");
}
export async function exit(auth: StudentAuthState) {
  update(auth, "exit");
}
