"use client"

import { exit, help, login, ready, work } from '@/app/(sigrid)/actions';
import { Button } from '@/components/ui/button';
import { useStudentAuth } from '@/hooks/use-student-auth';

export default function Home() {
  const { auth, setAuth } = useStudentAuth();

  const handleLogin = async () => {
    const newAuth = await login("test", "pgk", "test");
    setAuth(newAuth);
  };

  const handleExit = async () => {
    if (auth) {
      await exit(auth);
      setAuth(null);
    }
  };

  return <>
    <main className="flex p-8 gap-2">
      {auth
        ? <>
          <Button onClick={() => work(auth)}>Work</Button>
          <Button onClick={() => help(auth)}>Help</Button>
          <Button onClick={() => ready(auth)}>Ready</Button>
          <Button onClick={() => handleExit()}>Exit</Button>
          <pre>
            {JSON.stringify(auth, null, 2)}
          </pre>
        </>
        : <Button onClick={() => handleLogin()}>Login</Button>
      }
    </main>
  </>
}
