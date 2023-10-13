import { DateTime } from "luxon";

export default function parse(text: string) {
  console.log("===============================================");
  text = text.substring(text.indexOf("users:"));
  text = text.replaceAll(/<\/?\w*>|\&[^;]*;|\s*/g, "").trim();

  const splitIndex = text.indexOf("rooms:");

  const usersText = text.substring(0, splitIndex).trim();
  const roomsText = text.substring(splitIndex).trim();

  const users = parseUsers(usersText);
  const rooms = parseRooms(roomsText);
  return { users, rooms };
}

function parseUsers(text: string) {
  const match = text.match(/[^(]*\((.*)\)/);
  return match ? splitNames(match[1]) : [];
}

type QueuedUser = {
  userid: string;
  minutesInQueue: number;
};
export type Room = {
  course: string;
  room: string;
  supervisors: Array<string>;
  students: Array<string>;
  helpQueue: Array<QueuedUser>;
  approvalQueue: Array<QueuedUser>;
};
function parseRooms(text: string): Array<Room> {
  const match = text.match(/[^(]*\((.*)\)/);
  const result: Array<Room> = [];
  if (match) {
    const text = match[0];
    for (const match of text.matchAll(
      /RoomKey\([^)]*\)->Room(.+?)(?=RoomKey|$)/g
    )) {
      const text = match[1];
      const parts = text.match(
        /\((\w+),(\w+),(.+?)(?=students)(.+?)(?=helpQueue)(.+?)(?=approvalQueue)(.+?)(?=created)/
      );
      if (parts) {
        const [
          _,
          course,
          room,
          supervisorText,
          studentsText,
          helpQueueText,
          approvalQueueText,
        ] = parts;

        const parenTrim = (text: string) =>
          text.substring(text.indexOf("(") + 1, text.lastIndexOf(")"));

        result.push({
          course,
          room,
          supervisors: splitNames(parenTrim(supervisorText)),
          students: splitNames(parenTrim(studentsText).slice(0, -1)),
          helpQueue: splitQueue(parenTrim(helpQueueText)),
          approvalQueue: splitQueue(parenTrim(approvalQueueText)),
        });
      }
    }
  }
  return result;
}

function splitNames(text: string) {
  if (text.length === 0) return [];
  return text.split(",");
}

function getTimeDiff(text: string) {
  const now = DateTime.now().setZone("Europe/Stockholm");
  const then = DateTime.fromFormat(text, "yyyy,M,d,h,m,s", {
    zone: "Europe/Stockholm",
  });
  return Math.floor(now.diff(then, "minutes").minutes);
}

function splitQueue(text: string) {
  if (text.length === 0) return [];
  const result = [];
  for (const match of text.matchAll(/\(([^,]*),Date\((.*?)\)/g)) {
    const data = {
      userid: match[1],
      minutesInQueue: getTimeDiff(match[2]),
    };
    result.push(data);
  }
  return result;
}
