import BedTimeStep from "@/components/steps/BedTimeStep";
import GenderStep from "@/components/steps/GenderStep";
import HydrationPlanStep from "@/components/steps/HydrationPlanStep";
import NameStep from "@/components/steps/NameStep";
import WakeTimeStep from "@/components/steps/WakeTimeStep";
import WeightStep from "@/components/steps/WeightStep";
import WelcomeScreen from "@/components/steps/WelcomeScreen";
import { useHydrationProvider } from "@/context/HydrationContext";
import { scheduleHydrationReminders } from "@/notifications/scheduleHydrationReminders";
import * as Haptics from 'expo-haptics';
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Onboarding() {
    const { setUserData, setHydrationData } = useHydrationProvider();
    const [step, setStep] = useState(0);

    const [formData, setFormData] = useState({
        gender: "",
        weight: 50,
        wakeTime: null,
        bedTime: null,
        name: ""
    });

    const finishOnboarding = async (plan) => {
        await setUserData(formData);
        await setHydrationData(plan);
        await scheduleHydrationReminders(plan);
    };

    const setGender = (gender: string) => {
        setFormData((prev) => ({
            ...prev,
            gender: gender
        }));
    };

    const setWeight = (weight: number) => {
        setFormData((prev) => ({
            ...prev,
            weight: weight
        }));
    };

    const setWakeTime = (time: Date) => {
        setFormData((prev) => ({
            ...prev,
            wakeTime: time
        }));

    };

    const setBedTime = (time: Date) => {
        setFormData((prev) => ({
            ...prev,
            bedTime: time
        }));

    };

    const setName = (name: string) => {
        setFormData((prev) => ({
            ...prev,
            name: name
        }))
    }

    const renderStep = () => {

        if (step === 0) {
            return (
                <WelcomeScreen step={step} setStep={setStep} />
            )
        }

        if (step === 1) {
            return (
                <NameStep
                    setName={setName}
                    name={formData.name} />)
        }

        if (step === 2) {

            return (
                <GenderStep
                    setGender={setGender}
                    gender={formData.gender} />
            )
        }

        if (step === 3) {
            return (
                <WeightStep
                    setWeight={setWeight}
                    weight={formData.weight}
                    gender={formData.gender} />
            )
        }
        if (step === 4) {
            return (
                <WakeTimeStep
                    setWakeTime={setWakeTime}
                    gender={formData.gender} />
            )
        }
        if (step === 5) {
            return (
                <BedTimeStep
                    setBedTime={setBedTime}
                    gender={formData.gender}
                />
            )
        }
        if (step === 6) {
            return (
                <HydrationPlanStep
                    formData={formData}
                    finishOnboarding={finishOnboarding}
                />
            )
        }
    }

    // Helper to determine if the "Next" button should be disabled
    const isNextDisabled =
        (step === 1 && !formData.name) ||
        (step === 2 && !formData.gender) ||
        (step === 3 && formData.weight <= 0) ||
        (step === 4 && !formData.wakeTime) ||
        (step === 5 && !formData.bedTime);

    return (
        <View className="flex-1 items-center justify-center gap-20 px-5 py-5">

            {(step < 6 && step > 0) && (<Text className="text-xl absolute top-1">Step {step} / 5</Text>)}

            {renderStep()}

            {(step < 6) && (
                <View
                    className="flex-row w-full px-5 items-center"
                    style={{ justifyContent: step === 0 ? "center" : "space-between" }}
                >
                    {(step > 0) && (
                        <Pressable
                            onPress={() => {
                                setStep((prev) => prev - 1);
                                Haptics.performAndroidHapticsAsync(
                                    Haptics.AndroidHaptics.Clock_Tick
                                );
                            }}
                            className="py-3 px-8 border-none rounded-full bg-blue-400"
                        >
                            {(step === 0) ? <Text className="text-3xl text-white">Let's Start</Text> : <Text className="text-2xl text-white">Back</Text>}
                        </Pressable>
                    )}

                    <Pressable
                        onPress={() => {
                            setStep((prev) => prev + 1);
                            Haptics.performAndroidHapticsAsync(
                                Haptics.AndroidHaptics.Clock_Tick
                            );
                        }}
                        disabled={isNextDisabled}
                        className={`py-3 px-8 rounded-full bg-blue-400 items-center justify-center ${isNextDisabled ? 'opacity-70' : 'bg-blue-400'
                            }`}
                    >
                        {(step === 0) ? <Text className="text-3xl text-white">Let's Start</Text> : <Text className="text-2xl text-white">Next</Text>}
                    </Pressable>
                </View>
            )
            }

        </View>
    );
}