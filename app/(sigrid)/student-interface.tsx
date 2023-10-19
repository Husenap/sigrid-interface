'use client';

import { StudentState, update } from '@/app/(sigrid)/actions';
import { Icons } from '@/components/icons';
import { useStudentAuth } from '@/components/providers/student-auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export default function StudentInterface() {
  const { auth, setAuth } = useStudentAuth();
  const { toast } = useToast();

  const doUpdate = async (state: StudentState) => {
    if (!auth) return;
    try {
      await update(auth, state);
      setAuth((prev) => {
        if (!prev) return;
        prev.state = state;
      });
      switch (state) {
        case 'work':
          toast({ title: 'Du har hoppat ut ur kön.' });
          break;
        case 'help':
          toast({ title: 'Du har hoppat in i hjälpkön.' });
          break;
        case 'ready':
          toast({ title: 'Du har hoppat in i redovisningskön.' });
          break;
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Du har blivit utloggad!',
        description: (e as Error).message,
      });
      setAuth(null);
    }
  };

  const handleExit = async () => {
    if (auth) {
      try {
        await update(auth, 'exit');
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Du har blivit utloggad!',
          description: (e as Error).message,
        });
      } finally {
        setAuth(null);
      }
    }
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>
          <b>{auth?.userid}</b> i <b>{auth?.room}</b>
        </CardTitle>
        <CardDescription>Uppdatera ditt tillstånd så kommer det en handledare snart 🤖</CardDescription>
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
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="destructive" onClick={() => handleExit()}>
          <Icons.logout className="mr-2 h-4 w-4" /> Logga ut
        </Button>
      </CardFooter>
    </Card>
  );
}
