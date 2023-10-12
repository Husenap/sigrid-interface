"use client"

import { exit, help, login, ready, work } from '@/app/(sigrid)/actions';
import Login from '@/app/(sigrid)/login';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/layouts/page-header';
import { Button } from '@/components/ui/button';
import { useStudentAuth } from '@/hooks/use-student-auth';
import Link from 'next/link';

export default function Sigrid() {
  const { auth, setAuth } = useStudentAuth();

  const handleLogin = async (name: string, course: string, room: string) => {
    const newAuth = await login(name, course, room);
    setAuth(newAuth);
  };

  const handleExit = async () => {
    if (auth) {
      await exit(auth);
      setAuth(null);
    }
  };

  return <>
    <PageHeader>
      <PageHeaderHeading>Sigrid</PageHeaderHeading>
      <PageHeaderDescription>
        Sigrid är en hjälpköwebbapp.
        <br />
        Karta över <Link href="https://fileadmin.cs.lth.se/cs/Bilder/Salar/Datorsalar_E-huset.pdf">E-husets datorrum</Link>.
        Kolla <Link href="https://github.com/bjornregnell/sigrid/">koden</Link>.
      </PageHeaderDescription>
    </PageHeader>
    Hej student!


    <div className="flex gap-2 pt-8">
      {auth
        ? <>
          <Button variant="default" onClick={() => work(auth)}>Work</Button>
          <Button variant="default" onClick={() => help(auth)}>Help</Button>
          <Button variant="default" onClick={() => ready(auth)}>Ready</Button>
          <Button variant="destructive" onClick={() => handleExit()}>Exit</Button>
          <pre>
            {JSON.stringify(auth, null, 2)}
          </pre>
        </>
        : <Login handleLogin={handleLogin} />
      }
    </div>
  </>
}
