import Room from '@/app/monitor/room';
import { Course } from '@/lib/parser';

type Props = {
  course: Course;
};
export default function RoomList({ course }: Props) {
  const sortedRooms = course.rooms.toSorted((a, b) => b.helpQueue.length - a.helpQueue.length);
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {sortedRooms.map((room) => (
        <Room key={room.room} room={room} />
      ))}
    </div>
  );
}
