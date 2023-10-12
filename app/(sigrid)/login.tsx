"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ScrollArea } from "@/components/ui/scroll-area"

const KnownRooms = [
  "Pluto", "Neptunus", "Uranus", "Saturnus", "Jupiter", "Mars", "Venus", "Elg", "Elgkalv", "Hacke", "Panter", "Ravel", "Val", "Falk", "Varg", "Lo", "Alfa", "Beta", "Gamma", "Idét", "Distans"].toSorted()

const formSchema = z.object({
  name: z.string().min(1, "Du måste ange ett förnamn."),
  course: z.string().min(1, "Du måste ange en kurskod."),
  room: z.string().min(1, "Du måste välja ett rum."),
})

export default function Login({ handleLogin }: {
  handleLogin: (name: string, course: string, room: string) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      course: "pgk",
      room: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleLogin(values.name, values.course, values.room);
  }

  return <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Logga in</CardTitle>
            <CardDescription>Logga in i ett klassrum med din kurskod.</CardDescription>
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
                  <FormDescription>
                    Detta namnet ropas upp av handledarna.
                  </FormDescription>
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
                  <FormDescription>
                    Din kurskod, t.ex. pgk, dod...
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Välj rum" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-72">
                        {KnownRooms.map(room => <SelectItem key={room} value={room}>{room}</SelectItem>)}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Välj rummet som du befinner dig i.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button>Logga in</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  </>
}