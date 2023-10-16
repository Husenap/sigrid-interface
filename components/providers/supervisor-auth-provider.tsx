'use client';

import { SupervisorAuthState } from '@/app/beppe/actions';
import { toMidnight } from '@/lib/date';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Updater, useImmer } from 'use-immer';

const CookieKey = 'sigrid-supervisor-auth';

type SupervisorAuthContextType = {
  isLoading: boolean;
  auth: SupervisorAuthState | null;
  setAuth: Updater<SupervisorAuthState | null>;
};
const SupervisorAuthContext = createContext<SupervisorAuthContextType>({
  isLoading: true,
  auth: null,
  setAuth: () => {},
});

export function useSupervisorAuth() {
  return useContext(SupervisorAuthContext);
}

export function SupervisorAuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useImmer<SupervisorAuthState | null>(null);

  useEffect(() => {
    const cookie = getCookie(CookieKey);
    if (cookie) {
      setAuth(JSON.parse(cookie) as SupervisorAuthState);
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

  return (
    <SupervisorAuthContext.Provider value={{ isLoading, auth, setAuth }}>{children}</SupervisorAuthContext.Provider>
  );
}
