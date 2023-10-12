import { StudentAuthState } from "@/lib/api";
import { useEffect, useState } from "react";

import { deleteCookie, getCookie, setCookie } from "cookies-next";

const CookieKey = "sigrid-student-auth";

export function useStudentAuth() {
  const [auth, _setAuth] = useState<StudentAuthState | null>(null);

  useEffect(() => {
    const cookie = getCookie(CookieKey);
    if (cookie) _setAuth(JSON.parse(cookie) as StudentAuthState);
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
