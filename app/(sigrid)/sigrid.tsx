'use client';

import { login } from '@/app/(sigrid)/actions';
import Login from '@/app/(sigrid)/login';
import StudentInterface from '@/app/(sigrid)/student-interface';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/layouts/page-header';
import { useStudentAuth } from '@/components/providers/student-auth-provider';
import { site } from '@/config/site';
import Link from 'next/link';

export default function Sigrid() {
  const { isLoading, auth, setAuth } = useStudentAuth();

  const handleLogin = async (name: string, course: string, room: string) => {
    const newAuth = await login(name, course, room);
    setAuth(newAuth);
  };

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{site.name}</PageHeaderHeading>
        <PageHeaderDescription>
          <Link href="http://bjornix.cs.lth.se:8091/sigrid">Sigrid</Link> är en hjälpköwebbapp.
          <br />
          Karta över{' '}
          <Link href="https://fileadmin.cs.lth.se/cs/Bilder/Salar/Datorsalar_E-huset.pdf">E-husets datorrum</Link>.
          Kolla <Link href="https://github.com/bjornregnell/sigrid/">koden</Link>.
        </PageHeaderDescription>
      </PageHeader>
      Hej student!
      <div className="pt-8">{!isLoading && (auth ? <StudentInterface /> : <Login handleLogin={handleLogin} />)}</div>
    </>
  );
}
