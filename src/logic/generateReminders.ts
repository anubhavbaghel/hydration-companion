export const generateReminders = (
  wakeTime: Date | string,
  bedTime: Date | string,
  dailyGoal: number,
  waterPerReminder: number
) => {

  const reminders: Date[] = [];
  const DAY_IN_MS = 24 * 60 * 60 * 1000;

  const now = new Date();
  
  // Normalize both to "today"
  const wake = new Date(wakeTime);
  wake.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
  
  const bed = new Date(bedTime);
  bed.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());

  let activeTime = bed.getTime() - wake.getTime();

  if (activeTime <= 0) {
    // Bedtime is after midnight (next day)
    activeTime += DAY_IN_MS;
    bed.setTime(bed.getTime() + DAY_IN_MS);
  }

  const drinksNeeded = Math.ceil(dailyGoal / waterPerReminder);
  
  // Spread reminders across the entire active duration
  // If drinksNeeded is 1, it will be at wake time.
  // If > 1, they will be evenly spaced from wake time to bed time.
  const interval = drinksNeeded > 1 ? activeTime / (drinksNeeded - 1) : 0;

  let reminderTime = new Date(wake);

  for (let i = 0; i < drinksNeeded; i++) {
    reminders.push(new Date(reminderTime));
    reminderTime = new Date(reminderTime.getTime() + interval);
  }

  return reminders;
};