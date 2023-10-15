import Room from '@/app/monitor/room';
import { Course } from '@/lib/parser';

type Props = {
  course: Course;
};
export default function RoomList({ course }: Props) {
  const sortedRooms = course.rooms.toSorted(
    (a, b) =>
      b.helpQueue.length - a.helpQueue.length ||
      b.approvalQueue.length - a.approvalQueue.length ||
      a.room.localeCompare(b.room)
  );
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2 xl:grid-cols-3">
      {sortedRooms.map((room) => (
        <Room key={room.room} room={room} />
      ))}
    </div>
  );
}
