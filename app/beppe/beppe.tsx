'use client';

import Login from '@/app/(sigrid)/login';
import StudentInterface from '@/app/(sigrid)/student-interface';
import { login } from '@/app/beppe/actions';
import SupervisorInterface from '@/app/beppe/supervisor-interface';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/layouts/page-header';
import { useSupervisorAuth } from '@/components/providers/supervisor-auth-provider';
import { site } from '@/config/site';
import Link from 'next/link';

export default function Beppe() {
  const { isLoading, auth, setAuth } = useSupervisorAuth();

  const handleLogin = async (name: string, course: string, room: string) => {
    setAuth(await login(name, course, room));
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
      Hej handledare!
      <div className="pt-8">{!isLoading && (auth ? <SupervisorInterface /> : <Login handleLogin={handleLogin} />)}</div>
    </>
  );
}
