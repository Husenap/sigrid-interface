export function addYears(date: Date, years: number) {
  date.setFullYear(date.getFullYear() + years);
  return date;
}

export function toMidnight(date: Date) {
  date.setHours(23, 59, 59, 999);
  return date;
}
