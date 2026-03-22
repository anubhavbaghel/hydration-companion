import { useHydrationProvider } from "@/context/HydrationContext";
import { createHydrationPlan } from "@/logic/createHydrationplan";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AlertIcon from "../../assets/icons/alert.svg";

export default function HydrationSchedulePage() {

    const { userData } = useHydrationProvider()

    console.log(userData)

    const plan = createHydrationPlan(userData)

    console.log("Plan in Hydr")
    console.log(plan)
    const reminders = plan.reminders
    console.log(reminders)

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 gap-10 justify-center pt-10 px-3 ">
                <Text className="text-6xl text-center font-semibold">Your Today's Schedule</Text>

                <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={true}>
                    {plan.reminders.map((time, index) => (

                        <View key={index} className="flex-row flex-1 w-full rounded-full px-2 items-center justify-between bg-gray-100">
                            <View className="flex-row items-center justify-center gap-2 bg-blue py-5">
                                <AlertIcon fill={"#60A5FA"} width={25} height={25}/>
                                <Text className="text-2xl font-semibold text-gray-800">
                                    {time.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </Text>
                            </View>

                            <Text className="text-xl text-white bg-blue-400 rounded-full p-3 font-semibold">
                                {plan.waterPerReminder} ml
                            </Text>
                        </View>

                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        gap: 10,
        justifyContent: "center",
        flexGrow: 1,
        backgroundColor: "white",
        borderRadius: 30
    }
});