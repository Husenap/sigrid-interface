'use client';

import Login from '@/app/(sigrid)/login';
import { login } from '@/app/beppe/actions';
import SupervisorInterface from '@/app/beppe/supervisor-interface';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/layouts/page-header';
import { useSupervisorAuth } from '@/components/providers/supervisor-auth-provider';
import { useToast } from '@/components/ui/use-toast';

export default function Beppe() {
  const { isLoading, auth, setAuth } = useSupervisorAuth();
  const { toast } = useToast();

  const handleLogin = async (name: string, course: string, room: string) => {
    try {
      setAuth(await login(name, course, room));
    } catch {
      toast({
        variant: 'destructive',
        title: 'Misslyckades med att logga in! 🥺',
      });
    }
  };

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Hej Handledare!</PageHeaderHeading>
        <PageHeaderDescription>Här kan du logga in för att administrera ett rum.</PageHeaderDescription>
      </PageHeader>
      <div className="pt-8">{!isLoading && (auth ? <SupervisorInterface /> : <Login handleLogin={handleLogin} />)}</div>
    </>
  );
}
