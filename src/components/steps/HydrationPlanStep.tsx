import { createHydrationPlan } from "@/logic/createHydrationplan";
import * as Notifications from 'expo-notifications';
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function HydrationPlanStep({ formData, finishOnboarding }) {


  const plan = createHydrationPlan(formData);

  const handleStart = async () => {
    // Request permission only when clicking start
    const { status } = await Notifications.requestPermissionsAsync();
    
    if (status === 'granted') {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
    
    finishOnboarding(plan);
    console.log('Lets Start Hydrating')
  };

  return (
    <View className="flex-1 justify-between items-center w-full gap-2">
      {/* ... rest of the component stays the same ... */}

      <View className="flex h-[10%] flex-col justify-center w-full items-center rounded-2xl ">
        <Text className="text-4xl text-center font-bold w-full">Your Hydration Goal</Text>
      </View>

      <View className="flex h-[20%] flex-col justify-center gap-2 border border-gray-200 w-full items-center rounded-2xl py-4">
        <Text className='text-xl'>DAILY TARGET</Text>
        <Text className="text-5xl text-blue-400 font-semibold">{plan.dailyGoal} ml</Text>
        <Text className='text-md text-center'>You are all set to get hydrated {`\n`}and energized!</Text>
      </View>

      <View className="flex-row h-[10%] justify-center w-full items-center gap-2">
        <View className="border border-gray-200 flex-1 text-center h-full items-center justify-center rounded-2xl">
          <Text className="text-center text-blue-400 font-semibold">
            ACTIVE HOURS
          </Text>
          <Text className="text-3xl text-black font-semibold">
            {Math.floor(plan.activeHours)} hours
          </Text>
        </View>

        <View className="border border-gray-200 flex-1 text-center h-full items-center justify-center rounded-2xl">
          <Text className="text-center text-blue-400 font-semibold">
            💧 / REMINDER
          </Text>
          <Text className="text-3xl text-black font-semibold">
            {plan.waterPerReminder} ml
          </Text>
        </View>
      </View>

      <View style={{ alignItems: "center", gap: 10 }} className="flex-1 w-full">

        <View className="w-full flex flex-row justify-center items-center gap-2">
          <Text className="text-2xl font-medium " >Your Hydration Schedule</Text>
        </View>

        <ScrollView className="w-full flex-1">
          {plan.reminders.map((time, index) => (

            <View key={index} className="flex-row flex-1 w-full border border-blue-400 rounded-xl px-5 py-3 text-gray-700  items-center justify-center my-1">
              <View className="flex-row flex-1 items-center justify-start w-full gap-2">
                <Image source={require("../../../assets/media/notifications_active.png")} style={{ width: 20, height: 20 }} />
                <Text className="text-xl">
                  {time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </Text>
              </View>

              <Text className="text-xl text-blue-400 font-semibold">
                {plan.waterPerReminder} ml
              </Text>
            </View>

          ))}
        </ScrollView>

      </View >

      <Pressable
        onPress={handleStart}
        className="h-[8%] bg-blue-400 border border-gray-200 w-full rounded-full px-5 py-3 items-center justify-center flex">
        <Text className="text-4xl font-bold text-white">Start Hydrating!</Text>
      </Pressable>

    </View >
  );
}