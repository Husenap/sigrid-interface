'use client';

import { SupervisorState, update } from '@/app/beppe/actions';
import { Icons } from '@/components/icons';
import { useSupervisorAuth } from '@/components/providers/supervisor-auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export default function SupervisorInterface() {
  const { auth, setAuth } = useSupervisorAuth();
  const { toast } = useToast();

  const handleExit = async (state: SupervisorState) => {
    if (auth) {
      try {
        await update(auth, state, {
          name: '',
          other: '',
        });
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

  const doUpdate = async (state: SupervisorState) => {
    if (!auth) return;
    try {
      await update(auth, state, {
        name: '',
        other: '',
      });
      setAuth((prev) => {
        if (!prev) return;
        prev.state = state;
      });
      switch (state) {
        case 'pophelp':
          toast({ title: 'Du har poppat hjälpkön.' });
          break;
        case 'popready':
          toast({ title: 'Du har poppat redovisningskön.' });
          break;
        case 'clearhelp':
          toast({ title: 'Du har tömt hjälpkön.' });
          break;
        case 'clearready':
          toast({ title: 'Du har tömt redovisningskön.' });
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

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>
          <b>{auth?.userid}</b> i <b>{auth?.room}</b>
        </CardTitle>
        <CardDescription>Uppdatera ditt tillstånd så kommere en handledare snart 🤖</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          <Label className="col-span-2">Hjälpkö</Label>
          <Button variant="secondary" onClick={() => doUpdate('pophelp')}>
            <Icons.popQueue className="mr-2 h-4 w-4" /> Pop hjälpkö
          </Button>
          <Button variant="destructive" onClick={() => doUpdate('clearhelp')}>
            <Icons.clearQueue className="mr-2 h-4 w-4" /> Töm hjälpkö
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Label className="col-span-2">Redovisningskö</Label>
          <Button variant="secondary" onClick={() => doUpdate('popready')}>
            <Icons.popQueue className="mr-2 h-4 w-4" /> Pop redovkö
          </Button>
          <Button variant="destructive" onClick={() => doUpdate('clearready')}>
            <Icons.clearQueue className="mr-2 h-4 w-4" /> Töm redovkö
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Label>Hantera rum</Label>
          <Button variant="default" onClick={() => doUpdate('clearready')}>
            <Icons.removeUser className="mr-2 h-4 w-4" /> Ta bort användare
          </Button>
          <Button variant="default" onClick={() => doUpdate('clearready')}>
            <Icons.mergeRoom className="mr-2 h-4 w-4" /> Slå ihop rum
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="grid w-full grid-cols-2 gap-2">
          <Button variant="destructive" onClick={() => handleExit('purge')}>
            <Icons.purge className="mr-2 h-4 w-4" /> Radera rummet
          </Button>
          <Button variant="destructive" onClick={() => handleExit('gone')}>
            <Icons.logout className="mr-2 h-4 w-4" /> Logga ut
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
