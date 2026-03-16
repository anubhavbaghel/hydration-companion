import { generateReminders } from "./generateReminders";

interface UserData {
  weight: number;
  wakeTime: Date;
  bedTime: Date;
}

export const createHydrationPlan = (userData: UserData) => {

  const waterDrank = 0;

  const dailyGoal = Math.round(userData.weight * 35);

  const baseDrink = 250;

  const drinksNeeded = Math.ceil(dailyGoal / baseDrink);

  const waterPerReminder = Math.round(dailyGoal / drinksNeeded);

  const DAY_IN_MS = 24 * 60 * 60 * 1000;

  let diff =
    userData.bedTime.getTime() - userData.wakeTime.getTime();

  if (diff <= 0) {
    diff += DAY_IN_MS;
  }

  const activeHours = diff / (1000 * 60 * 60);

  const reminders = generateReminders(
    userData.wakeTime,
    userData.bedTime,
    dailyGoal,
    waterPerReminder
  );

  return {
    dailyGoal,
    reminders,
    waterPerReminder,
    activeHours,
    waterDrank,
    date: new Date().toISOString()
  };
};