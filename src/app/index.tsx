import LoadingScreen from "@/components/ui/LoadingScreen";
import { useHydrationProvider } from "@/context/HydrationContext";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Dashboard from "./Dashboard";
import Onboarding from "./onboarding";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { userData, loading } = useHydrationProvider();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) return <LoadingScreen />;

  if (!userData) {
    return (
      <SafeAreaView style={{ flex: 1 }} className="bg-white">
        <Onboarding />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Dashboard />
    </SafeAreaView>
  );
}