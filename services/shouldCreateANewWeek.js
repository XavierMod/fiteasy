import todaysDate from "./todaysDate";

export default function shouldCreateANewWeek(lastWeekStamp) {

  // Convert to dates
  const getToday = new Date(todaysDate());
  const getLastWeek = new Date(lastWeekStamp);
  // Calculate difference
  var difference = getToday.getTime() - getLastWeek.getTime();
  var differenceInDays = Math.ceil(difference / (1000 * 3600 * 24));

  if (differenceInDays >= 7) {
    return true;
  } else if (lastWeekStamp === undefined) {
    return true
  } else {
    return false;
  }
}
