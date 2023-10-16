'use client';

import { StudentState, exit, update } from '@/app/(sigrid)/actions';
import { Icons } from '@/components/icons';
import { useStudentAuth } from '@/components/providers/student-auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentInterface() {
  const { auth, setAuth } = useStudentAuth();

  const doUpdate = async (state: StudentState) => {
    if (!auth) return;
    await update(auth, state);
    setAuth((prev) => {
      if (!prev) return;
      prev.state = state;
    });
  };

  const handleExit = async () => {
    if (auth) {
      await exit(auth);
      setAuth(null);
    }
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>{auth?.room}</CardTitle>
        <CardDescription>Uppdatera ditt tillstånd så kommere en handledare snart 🤖</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button variant={auth?.state === 'work' ? 'default' : 'secondary'} onClick={() => doUpdate('work')}>
          <Icons.work className="mr-2 h-4 w-4" /> Köar inte
        </Button>
        <Button variant={auth?.state === 'help' ? 'default' : 'secondary'} onClick={() => doUpdate('help')}>
          <Icons.help className="mr-2 h-4 w-4" /> Hjäälp!!!
        </Button>
        <Button variant={auth?.state === 'ready' ? 'default' : 'secondary'} onClick={() => doUpdate('ready')}>
          <Icons.ready className="mr-2 h-4 w-4" /> Fäärdiig!
        </Button>
        <Button variant="destructive" onClick={() => handleExit()}>
          <Icons.logout className="mr-2 h-4 w-4" /> Logga ut
        </Button>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
