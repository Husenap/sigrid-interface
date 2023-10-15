'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const KnownRooms = [
  'Pluto',
  'Neptunus',
  'Uranus',
  'Saturnus',
  'Jupiter',
  'Mars',
  'Venus',
  'Elg',
  'Elgkalv',
  'Hacke',
  'Panter',
  'Ravel',
  'Val',
  'Falk',
  'Varg',
  'Lo',
  'Alfa',
  'Beta',
  'Gamma',
  'Idét',
  'Distans',
].sort();

const formSchema = z.object({
  name: z.string().min(1, 'Du måste ange ett förnamn.').max(15, 'Ditt namn får max vara 15 bokstäver.'),
  course: z.string().min(1, 'Du måste ange en kurskod.').max(8, 'Kurskoden får max vara 8 bokstäver.'),
  room: z.string().min(1, 'Du måste välja ett rum.'),
});
type FormSchema = z.infer<typeof formSchema>;

export default function Login({ handleLogin }: { handleLogin: (name: string, course: string, room: string) => void }) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      course: 'pgk',
      room: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: FormSchema) {
    await handleLogin(values.name, values.course, values.room);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Logga in</CardTitle>
              <CardDescription>Logga in i ett klassrum med rätt kurskod.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Förnamn</FormLabel>
                    <FormControl>
                      <Input placeholder="kim" {...field} />
                    </FormControl>
                    <FormDescription>Detta är ditt visningsnamn.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kurskod</FormLabel>
                    <FormControl>
                      <Input placeholder="pgk, dod..." {...field} />
                    </FormControl>
                    <FormDescription>Din kurskod, t.ex. pgk, dod...</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="room"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rum</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Välj rum" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <ScrollArea className="h-72">
                          {KnownRooms.map((room) => (
                            <SelectItem key={room} value={room}>
                              {room}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <FormDescription>Välj rummet som du befinner dig i.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              {isSubmitting ? (
                <Button disabled>
                  <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                  Loggar in
                </Button>
              ) : (
                <Button>
                  <Icons.login className="mr-2 h-4 w-4" /> Logga in
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
}
