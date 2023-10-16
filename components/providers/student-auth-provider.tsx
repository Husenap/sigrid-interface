'use client';

import { StudentAuthState } from '@/app/(sigrid)/actions';
import { toMidnight } from '@/lib/date';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Updater, useImmer } from 'use-immer';

const CookieKey = 'sigrid-student-auth';

type StudentAuthContextType = {
  isLoading: boolean;
  auth: StudentAuthState | null;
  setAuth: Updater<StudentAuthState | null>;
};
const StudentAuthContext = createContext<StudentAuthContextType>({
  isLoading: true,
  auth: null,
  setAuth: () => {},
});

export function useStudentAuth() {
  return useContext(StudentAuthContext);
}

export function StudentAuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useImmer<StudentAuthState | null>(null);

  useEffect(() => {
    const cookie = getCookie(CookieKey);
    if (cookie) {
      setAuth(JSON.parse(cookie) as StudentAuthState);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (auth) {
      setCookie(CookieKey, JSON.stringify(auth), {
        expires: toMidnight(new Date()),
      });
    } else {
      deleteCookie(CookieKey);
    }
  }, [auth]);

  return <StudentAuthContext.Provider value={{ isLoading, auth, setAuth }}>{children}</StudentAuthContext.Provider>;
}
