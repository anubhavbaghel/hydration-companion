import Header from "@/components/ui/Header";
import { useHydrationProvider } from "@/context/HydrationContext";
import { getNextReminder } from "@/logic/getNextReminder";
import * as Haptics from 'expo-haptics';
import { Pressable, Text, View } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';
import AlarmClock from "../../assets/media/alarm-clock-svgrepo-com.svg";


export default function Dashboard() {
    const { hydrationData, updateWater, resetApp, userData  } = useHydrationProvider();

    if (!hydrationData) return null;

    const nextReminder = getNextReminder(hydrationData.reminders ?? null);
    const waterDrank = hydrationData.waterDrank || 0;

    return (
        <View
            className="flex-1 items-center justify-between py-5 px-5"
        >
            <Header></Header>

            {/* Greetings */}
            <Text>Hi, {userData.name}</Text>
            <Text>Your Today's Water Intake is: {waterDrank}</Text>

            <CircularProgress
                value={waterDrank}
                radius={120}
                duration={2000}
                activeStrokeColor={'#60A5FA'}
                inActiveStrokeColor={'#F8FAFC'}
                progressValueStyle={{ fontWeight: '600', color: 'black', fontSize: 50 }}
                maxValue={hydrationData.dailyGoal}
                title={`${Math.round((waterDrank / hydrationData.dailyGoal) * 100)}%`}
                activeStrokeWidth={12}
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
                </Text>) : (<Text className=" text-white text-center text-2xl">Drink Water !!! + {hydrationData.waterPerReminder}ml
                </Text>)}
            </Pressable>

            <Pressable className="bg-red-400 py-3 px-5 rounded-full"
                onPress={async () => {
                    await resetApp();
                    console.log("User and hydration data deleted");
                }}
            >
                <Text className="text-white text-3xl">Reset App</Text>
            </Pressable>

        </View>
    );
}
