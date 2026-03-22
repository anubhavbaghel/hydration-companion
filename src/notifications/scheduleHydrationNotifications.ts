import * as Notifications from 'expo-notifications';

export const scheduleHydrationNotifications = async (plan) => {

    //Cancels all the previous notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    const { reminders, waterPerReminder } = plan
    console.log(waterPerReminder)

    for (const dateString of reminders) {
        const date = new Date(dateString)

        if (date > new Date()) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Time to drink some water",
                    body: "Its time have a glass of water",
                  
                    sound: true,
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.DATE,
                    date: date,
                },
            });
        }
    }

console.log("Scheduling hydration reminders", plan.reminders.length);
}