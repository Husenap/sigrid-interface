import RoomList from '@/app/monitor/room-list';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TypographyLarge, TypographyLead } from '@/components/ui/typography';
import { Courses } from '@/lib/parser';

type Props = {
  courses: Courses;
};
export default function CourseList({ courses }: Props) {
  return (
    <div>
      {courses.length > 0 ? (
        <Accordion type="single" defaultValue="PGK">
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
      ) : (
        <TypographyLarge>Alla salar är tomma just nu...</TypographyLarge>
      )}
    </div>
  );
}
