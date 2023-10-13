"use client";

import { StudentAuthState } from "@/lib/api";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CookieKey = "sigrid-student-auth";

type StudentAuthContextType = {
  isLoading: boolean;
  auth: StudentAuthState | null;
  setAuth: Dispatch<SetStateAction<StudentAuthState | null>>;
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
  const [auth, setAuth] = useState<StudentAuthState | null>(null);

  useEffect(() => {
    const cookie = getCookie(CookieKey);
    if (cookie) {
      setAuth(JSON.parse(cookie) as StudentAuthState);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (auth) {
      setCookie(CookieKey, JSON.stringify(auth));
    } else {
      deleteCookie(CookieKey);
    }
  }, [auth]);

  return (
    <StudentAuthContext.Provider value={{ isLoading, auth, setAuth }}>
      {children}
    </StudentAuthContext.Provider>
  );
}
