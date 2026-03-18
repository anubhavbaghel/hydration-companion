import * as Notifications from 'expo-notifications';

export const scheduleHydrationReminders = async (plan) => {

    //Cancels all the previous notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    const { reminders, waterPerReminder } = plan
    console.log(waterPerReminder)

    for (const dateString of reminders) {
        const date = new Date(dateString)

        if (date > new Date()) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "It's time to drink some water!!!",
                    body: `Drink ${waterPerReminder}ml of water.`,
                    sound: true,
                    categoryIdentifier: 'hydration_reminder',
                    data: { data: waterPerReminder },

                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.DATE,
                    date: date,
                },
            });
        }
    }

}