import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TypographyH4 } from '@/components/ui/typography';
import { QueuedStudent, Room } from '@/lib/parser';

type RoomProps = {
  room: Room;
};
export default function Room({ room }: RoomProps) {
  return (
    <Card>
      <div className="x:m-0 -m-2">
        <CardHeader>
          <CardTitle>{room.room}</CardTitle>
          <CardDescription>
            <p>Handledare: {room.supervisors.join(', ')}</p>
            <p>Studenter: {room.students.length}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row justify-between gap-2">
          <div>
            <TypographyH4>Hjälpkö: {room.helpQueue.length}</TypographyH4>
            <Queue students={room.helpQueue} />
          </div>
          <div dir="rtl">
            <TypographyH4>Redovkö: {room.approvalQueue.length}</TypographyH4>
            <Queue students={room.approvalQueue} />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

type QueueProps = {
  students: Array<QueuedStudent>;
};
function Queue({ students }: QueueProps) {
  return (
    <div className="flex flex-col pt-2">
      {students.map(({ userid, minutesInQueue }, index) => (
        <div key={userid} className="flex flex-none items-center gap-1">
          {userid}
          {index === 0 && minutesInQueue > 0 && (
            <Badge variant="outline" className="relative">
              {minutesInQueue}
              {minutesInQueue > 10 && (
                <div className="absolute -right-1 -top-1">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                  </span>
                </div>
              )}
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
}
