export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

//index of month starts from 0 so January is 0, then February is 1 and so on.
//solve this by adding 1

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
