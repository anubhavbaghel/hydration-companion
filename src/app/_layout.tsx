import { HydrationProvider, useHydrationProvider } from '@/context/HydrationContext';
import * as Notifications from 'expo-notifications';
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../../global.css";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const NotificationManager = () => {
  const { updateWater } = useHydrationProvider();

  useEffect(() => {
    const setupNotifications = async () => {
      // Configuration remains, but we don't prompt here anymore
      await Notifications.setNotificationCategoryAsync('hydration_reminder', [
        {
          identifier: 'drank_water',
          buttonTitle: 'I Drank It',
          options: { opensAppToForeground: false },
        },
        {
          identifier: 'snooze',
          buttonTitle: 'Snooze',
          options: { opensAppToForeground: false },
        },
      ]);
      //Important for custom notification sound
      await Notifications.setNotificationChannelAsync('hydration-channel', {
        name: 'Hydration Reminders',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });

    };

    setupNotifications();

    const subscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
      const actionId = response.actionIdentifier;
      const notificationId = response.notification.request.identifier;

      if (actionId === 'drank_water') {
        await updateWater();
        await Notifications.dismissNotificationAsync(notificationId);
      } else if (actionId === 'snooze') {
        const seconds = 60 * 10;
        await Notifications.scheduleNotificationAsync({
          content: response.notification.request.content,
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds,
          } as any, // Cast to any because of some type issues with TIME_INTERVAL in some expo versions
        })
        await Notifications.dismissNotificationAsync(notificationId);;
      }
    });

    return () => subscription.remove();
  }, [updateWater]);

  return null;
};

export default function Layout() {
  return (
    <HydrationProvider>
      <NotificationManager />
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </SafeAreaProvider>
    </HydrationProvider>
  );
}
