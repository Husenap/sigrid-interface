'use client';

import { login } from '@/app/(sigrid)/actions';
import Login from '@/app/(sigrid)/login';
import StudentInterface from '@/app/(sigrid)/student-interface';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/layouts/page-header';
import { useStudentAuth } from '@/components/providers/student-auth-provider';
import { useToast } from '@/components/ui/use-toast';

export default function Sigrid() {
  const { isLoading, auth, setAuth } = useStudentAuth();
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
        <PageHeaderHeading>Hej Student!</PageHeaderHeading>
        <PageHeaderDescription>
          Här kan du logga in som student för att hoppa in i hjälpkön eller redovisningskön.
        </PageHeaderDescription>
      </PageHeader>
      <div className="pt-8">{!isLoading && (auth ? <StudentInterface /> : <Login handleLogin={handleLogin} />)}</div>
    </>
  );
}
