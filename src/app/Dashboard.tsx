import { useHydrationProvider } from "@/context/HydrationContext";
import { getNextReminder } from "@/logic/getNextReminder";
import * as Haptics from 'expo-haptics';
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';
import AlarmClock from "../../assets/media/alarm-clock-svgrepo-com.svg";

export default function Dashboard() {
    const { hydrationData, updateWater, userData } = useHydrationProvider();

    if (!hydrationData) return null;

    const nextReminder = getNextReminder(hydrationData.reminders ?? null);
    const waterDrank = hydrationData.waterDrank || 0;

    return (
        // <SafeAreaView>
        <View
            className="flex-1 items-center justify-between py-5 px-5"

        >
            {/* <TopNavBar /> */}

            {/* Greetings */}
            <Text className="text-6xl font-semibold py-10">Hi, {userData.name.charAt(0).toUpperCase() + userData.name.slice(1)}</Text>

            <CircularProgress
                value={waterDrank}
                radius={130}
                duration={2000}
                activeStrokeColor={'#60A5FA'}
                inActiveStrokeColor={'#F8FAFC'}
                progressValueStyle={{ fontWeight: '600', color: 'black', fontSize: 50 }}
                maxValue={hydrationData.dailyGoal}
                title={<View className="items-center">
                    <View className="items-center gap-5">
                        <Text className="text-4xl">/ {hydrationData.dailyGoal} ml</Text>
                        <Text className="text-2xl font-bold">Daily Water Goal</Text>
                    </View>
                </View>}
                activeStrokeWidth={18}
                titleStyle={{ fontWeight: 'bold', color: "gray", fontSize: 20 }}
            />


            {/* Next Reminder */}

            <View className="w-full bg-blue-100 border border-blue-300 rounded-3xl p-4 items-center">
                <View className="items-center">
                    <AlarmClock width={"40"} height={"40"} />
                    <Text className="text-gray-500 text-lg">Next Reminder</Text>

                    <Text className="text-3xl font-bold text-blue-500">
                        {nextReminder ? nextReminder.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }).toUpperCase()
                            : (waterDrank >= hydrationData.dailyGoal ? "Goal Reached! 🥳" : "No more today 🎉")}
                    </Text>

                    {nextReminder && (
                        <Text className="text-blue-400 mt-1">
                            In {Math.max(0, Math.round((nextReminder.getTime() - new Date().getTime()) / 60000))} minutes
                        </Text>
                    )}
                </View>
            </View>


            {/* See All Reminders Popup */}
            <Link href="/hydration-schedule-page" asChild>
                <Text className="border border-blue-400 rounded-full p-3 text-blue-400 text-xl">See All Reminders</Text>
            </Link>

            <Pressable
                disabled={waterDrank >= hydrationData.dailyGoal}
                className={`w-full py-5 rounded-full ${(waterDrank >= hydrationData.dailyGoal) ? "border border-gray-400" : "bg-blue-400"}`}
                onPress={async () => {
                    await updateWater();

                    Haptics.performAndroidHapticsAsync(
                        Haptics.AndroidHaptics.Clock_Tick
                    );
                }}
            >


                {(waterDrank >= hydrationData.dailyGoal) ? (<Text className=" text-2xl text-black text-center">Daily Goal Reached Hurray!!
                </Text>) : (<Text className=" text-white text-center text-3xl font-semibold">Drink Water
                </Text>)}
            </Pressable>
        </View>
        // </SafeAreaView>
    );
}
