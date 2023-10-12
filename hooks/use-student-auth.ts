"use client";

import { StudentAuthState } from "@/lib/api";
import { useEffect, useState } from "react";

import { deleteCookie, setCookie, getCookie } from "cookies-next";

const CookieKey = "sigrid-student-auth";

export function useStudentAuth() {
  const [auth, _setAuth] = useState<StudentAuthState | null>(null);

  useEffect(() => {
    try {
      const cookie = getCookie(CookieKey);
      if (!cookie) return;
      _setAuth(JSON.parse(cookie) as StudentAuthState);
    } catch {}
  }, []);

  const setAuth = (value: Parameters<typeof _setAuth>[0]) => {
    _setAuth(value);
    if (value) {
      setCookie(CookieKey, JSON.stringify(value));
    } else {
      deleteCookie(CookieKey);
    }
  };

  return { auth, setAuth };
}
