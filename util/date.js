export function getFormattedDate(date) {
  const convertedDate = new Date(date);

  return `${convertedDate.getFullYear()}-${
    convertedDate.getMonth() + 1
  }-${convertedDate.getDate()}`;
}
export function getDateMinusDays(date, days) {
  const convertedDate = new Date(date);
  return new Date(
    convertedDate.getFullYear(),
    convertedDate.getMonth(),
    convertedDate.getDate() - days
  );
}
