export const getNextReminder = (reminders: (Date | string)[]): Date | undefined => {
  if (!reminders || reminders.length === 0) {
    console.log("getNextReminder: Reminders array is empty or null");
    return undefined;
  }

  const now = new Date();

  // 1. Convert all to Date objects, filter out invalid ones, and sort
  const dates = reminders
    .map(time => new Date(time))
    .filter(date => !isNaN(date.getTime()))
    .sort((a, b) => a.getTime() - b.getTime());

  if (dates.length === 0) {
    console.log("getNextReminder: No valid dates found in reminders array");
    return undefined;
  }

  // 2. Find the FIRST time that is greater than 'now'
  const next = dates.find(time => time.getTime() > now.getTime());
  
  if (!next) {
    console.log("getNextReminder: All reminders are in the past. Last reminder was at:", dates[dates.length-1].toLocaleTimeString());
  } else {
    console.log("getNextReminder: Found next reminder at:", next.toLocaleTimeString());
  }

  return next;
};
