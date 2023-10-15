import RoomList from "@/app/monitor/room-list";
import { Courses } from "@/lib/parser";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  courses: Courses;
};
export default function CourseList({ courses }: Props) {
  return (
    <div>
      <Accordion type="single" collapsible>
        {courses.map((course) => (
          <AccordionItem key={course.name} value={course.name}>
            <AccordionTrigger>
              {course.name} - {course.rooms.length} rum
            </AccordionTrigger>
            <AccordionContent>
              <RoomList course={course} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <pre className="p-8">{JSON.stringify(courses, null, 2)}</pre>
    </div>
  );
}
