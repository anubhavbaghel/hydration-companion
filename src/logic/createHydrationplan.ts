import { generateReminders } from "./generateReminders";

interface UserData {
  weight: number;
  wakeTime: Date;
  bedTime: Date;
  name:"";
  gender:""
}

export const createHydrationPlan = (userData: UserData) => {

  const bedTime = new Date(userData.bedTime);
  console.log("bedtime in create Hydration plan")
  console.log(bedTime)

  const wakeTime = new Date(userData.wakeTime);

  const waterDrank = 0;

  const dailyGoal = Math.round(userData.weight * 35);

  const baseDrink = 250;

  const drinksNeeded = Math.ceil(dailyGoal / baseDrink);

  const waterPerReminder = Math.round(dailyGoal / drinksNeeded);

  const DAY_IN_MS = 24 * 60 * 60 * 1000;

  const bedTimeDate = new Date(userData.bedTime);
  const wakeTimeDate = new Date(userData.wakeTime);

  if (Number.isNaN(bedTimeDate.getTime()) || Number.isNaN(wakeTimeDate.getTime())) {
    throw new Error('Invalid wakeTime or bedTime in userData');
  }

  let diff = bedTimeDate.getTime() - wakeTimeDate.getTime();

  if (diff <= 0) {
    diff += DAY_IN_MS;
  }

  const activeHours = diff / (1000 * 60 * 60);

  const reminders = generateReminders(
    wakeTime,
    bedTime,
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