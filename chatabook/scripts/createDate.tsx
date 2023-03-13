export function createDate(date: Date) {
  return new Date(parseInt(date.toString())).toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
