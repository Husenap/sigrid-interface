import { help, ready, work } from "@/app/(sigrid)/actions";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StudentAuthState } from "@/lib/api";

export default function Room({
  auth,
  handleExit,
}: {
  auth: StudentAuthState;
  handleExit: () => void;
}) {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>{auth.room}</CardTitle>
        <CardDescription>
          Uppdatera ditt tillstånd så kommere en handledare snart 🤖
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button onClick={() => work(auth)}>
          <Icons.work className="mr-2 h-4 w-4" /> Köar inte
        </Button>
        <Button onClick={() => help(auth)}>
          <Icons.help className="mr-2 h-4 w-4" /> Hjäälp!!!
        </Button>
        <Button onClick={() => ready(auth)}>
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
