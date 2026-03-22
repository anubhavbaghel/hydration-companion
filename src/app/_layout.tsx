import { HydrationProvider } from '@/context/HydrationContext';
import * as Notifications from 'expo-notifications';
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../../global.css";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});


SplashScreen.preventAutoHideAsync();

export default function Layout() {
  return (
    <HydrationProvider>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content"></StatusBar>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </SafeAreaProvider>
    </HydrationProvider>
  );
}
