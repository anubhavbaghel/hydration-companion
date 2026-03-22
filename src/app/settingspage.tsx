import { useHydrationProvider } from "@/context/HydrationContext";
import { createHydrationPlan } from "@/logic/createHydrationplan";
import { scheduleHydrationNotifications } from "@/notifications/scheduleHydrationNotifications";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Haptics from 'expo-haptics';
import { Link } from "expo-router";
import React, { useState } from "react";
import { Modal, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "../../assets/icons/arrow_back.svg";
import BedTimeIcon from "../../assets/icons/bedtime.svg";
import EditIcon from "../../assets/icons/edit.svg";
import FemaleIcon from "../../assets/icons/female.svg";
import MaleIcon from "../../assets/icons/male_gender.svg";
import ProfileIcon from "../../assets/icons/profile.svg";
import SaveIcon from "../../assets/icons/save.svg";
import SunriseIcon from "../../assets/icons/sunrise.svg";
import WeightIcon from "../../assets/icons/weight.svg";

export default function SettingsPage() {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const { resetApp, userData, setUserData, setHydrationData } = useHydrationProvider();

    const [wakeTime, setWakeTime] = useState(userData?.wakeTime ? new Date(userData.wakeTime) : new Date())
    const [bedTime, setBedTime] = useState(userData?.bedTime ? new Date(userData.bedTime) : new Date())
    const [isEditModeOn, setIsEditModeOn] = useState(false)
    const [name, setName] = useState(userData.name)
    const [gender, setGender] = useState(userData.gender)
    const [weight, setWeight] = useState(userData.weight)
    const [isSaveComplete, setIsSaveComplete] = useState(null)

    const [showWakeTimePicker, setShowWakeTimePicker] = useState(false);
    const [showBedTimePicker, setShowBedTimePicker] = useState(false);

    const changeWakeTime = (event, selectedDate) => {

        if (selectedDate) {
            setShowWakeTimePicker(false);
            setWakeTime(selectedDate)
        }
    };

    const changeBedTime = (event, selectedDate) => {

        if (selectedDate) {
            setShowBedTimePicker(false);
            setBedTime(selectedDate)
        }
    };

    const selectGender = async (gender: string) => {
        setGender(gender)
        setIsModalVisible(false)
    }

    const saveEditedData = async () => {
        const updatedData = {
            ...userData,
            name: name,
            gender: gender,
            weight: weight,
            wakeTime: wakeTime.toISOString(),
            bedTime: bedTime.toISOString()
        }

        //After clicking on save we need to 
        //Save data to Async Storage through context
        await setUserData(updatedData)

        setIsEditModeOn(false)
        setIsSaveComplete(true)

        //Recalculate and create new Hydration Plan and update it to Async Storage through context
        const updatedHydrationData =  createHydrationPlan(updatedData)
        console.log("This is Hydration Data")
        console.log(updatedHydrationData)
        
        setHydrationData(updatedHydrationData)
        
        //Generate updated Reminders

        //Set Notifications
        await scheduleHydrationNotifications(updatedHydrationData)

    }

    return (
        <SafeAreaView className="flex-1 py-5">

            <View className="flex-1 px-4 gap-6 justify-between">
                <View className="items-center flex-row justify-center">
                    <Link href="/" className="absolute left-0"><BackIcon /></Link>
                    <Text className="text-6xl font-semibold py-10">Settings</Text>
                </View>

                <View className=" rounded-3xl gap-10">

                    {/* Personal Information */}
                    <View className="gap-3">

                        {(isEditModeOn) ?
                            (<View className="flex-row justify-between items-end">
                                <Text className="text-2xl px-2">Personal Information</Text>

                                <Pressable className="px-4 bg-green-200 rounded-2xl p-2 border border-black items-center flex-row gap-2" onPress={() => {
                                    saveEditedData(); Haptics.performAndroidHapticsAsync(
                                        Haptics.AndroidHaptics.Clock_Tick
                                    )
                                }}>
                                    <Text className="text-black text-xl">Save</Text>
                                    <SaveIcon width={25} height={25} fill="black" /></Pressable>


                            </View>) :
                            (<View className="flex-row justify-between items-end">
                                <Text className="text-2xl px-2">Personal Information</Text>

                                <Pressable className="px-4 bg-blue-200 rounded-2xl p-2 border border-black items-center flex-row gap-2" onPress={() => {
                                    setIsEditModeOn(true);

                                    Haptics.performAndroidHapticsAsync(
                                        Haptics.AndroidHaptics.Clock_Tick
                                    );
                                }}>
                                    <Text className="text-black text-xl">Edit</Text>

                                    <EditIcon width={20} height={20} fill="black" />
                                </Pressable>
                            </View>)}



                        <View className="bg-white rounded-3xl py-4 px-5 gap-1">

                            {/* Name */}
                            <View className="gap-5 flex-row items-center">
                                <ProfileIcon fill={"gray"} width={30} height={30} />
                                {(isEditModeOn) ? <TextInput value={name} onChangeText={newText => setName(newText)} className={`text-2xl flex-1 px-3 rounded-xl `}>

                                </TextInput> : <TextInput editable={false}
                                    value={name} onChangeText={newText => setName(newText)} className={`text-2xl flex-1 px-3 rounded-xl `}>

                                </TextInput>}
                            </View>

                            {/* Gender */}
                            <View className={"flex-row gap-5 items-center"}>
                                {/* <Text className="text-xl font-semibold">Gender</Text> */}
                                {(gender === "male") ? (<MaleIcon fill={"gray"} width={30} height={30} />) : (<FemaleIcon fill={"gray"} width={30} height={35} />)}
                                {(isEditModeOn) ? (<Pressable onPress={() => setIsModalVisible(true)}>
                                    <Text className={`text-2xl px-3 py-3 rounded-xl  `}>{gender}</Text>
                                </Pressable>) : (<Pressable disabled={true} onPress={() => setIsModalVisible(true)}>
                                    <Text className={`text-2xl px-3 py-3 rounded-xl  `}>{gender}</Text>
                                </Pressable>)}
                            </View>

                            {/* Gender Selection Popup */}
                            <Modal
                                transparent={true}
                                visible={isModalVisible}
                                animationType="fade"
                            >
                                <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                                    <View className="flex-1 justify-center items-center bg-black/50 px-10">
                                        <View className="justify-between bg-white rounded-3xl w-[90%] px-4 gap-5 py-4">
                                            <Text className="text-2xl">Select Gender</Text>
                                            <View className="gap-2">
                                                <Pressable className="justify-center rounded-ll p-3" onPress={() => selectGender("Male")}><Text className="text-2xl">Male</Text></Pressable>
                                                <Pressable className="justify-center rounded-lg border border-pink -400 p-3" onPress={() => selectGender("Female")}><Text className="text-2xl">Female</Text></Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Modal>

                            {/* Weight */}
                            <View className="flex-row gap-5 items-center">
                                {/* <Text className="text-xl font-semibold">Weight</Text> */}
                                <WeightIcon fill={"gray"} width={30} height={30} />
                                {(isEditModeOn) ? (<TextInput value={weight?.toString()} keyboardType="numeric" onChangeText={newWeight => setWeight(Number(newWeight))} className={`text-2xl flex-1 px-3 rounded-xl `}></TextInput>) : (<TextInput editable={false} value={weight?.toString()} className={`text-2xl flex-1 px-3 rounded-xl `}></TextInput>)}
                            </View>

                        </View>
                    </View>

                    {/* Daily Schedule */}
                    <View className="gap-3 ">
                        <Text className="text-2xl px-2">Daily Schedule</Text>
                        <View className="bg-white rounded-3xl py-4 px-5 gap-5">


                            {/* Wakeup Time */}
                            <View className={"flex-row gap-5 items-center"}>
                                {/* <Text className="text-xl ">Wakeup Time</Text> */}
                                <SunriseIcon fill={"gray"} width={30} height={30} />
                                <Pressable disabled={!isEditModeOn} onPress={() => setShowWakeTimePicker(true)}>
                                    <Text className={`text-2xl flex-1 px-3 rounded-xl  `}>{wakeTime
                                        ? wakeTime.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        }).toUpperCase()
                                        : "--:--"}</Text>
                                </Pressable>

                                {
                                    showWakeTimePicker && (
                                        <DateTimePicker
                                            testID="wakeTimePicker"
                                            value={wakeTime}
                                            mode="time"
                                            is24Hour={false}
                                            display="default" // or 'spinner' for a different look
                                            onChange={changeWakeTime}
                                        />
                                    )
                                }
                            </View>

                            {/* BedTime */}
                            <View className={"flex-row gap-5 items-center"}>
                                {/* <Text className="text-xl ">Bed Time</Text> */}
                                <BedTimeIcon fill={"gray"} width={30} height={30} />
                                <Pressable disabled={!isEditModeOn} onPress={() => setShowBedTimePicker(true)}>
                                    <Text className={`text-2xl flex-1 px-3 rounded-xl `}>{bedTime ? bedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase() : "--:--"}</Text>

                                </Pressable>

                                {
                                    showBedTimePicker && (
                                        <DateTimePicker
                                            testID="BedTimePicker"
                                            value={bedTime}
                                            mode="time"
                                            is24Hour={false}
                                            display="default" // or 'spinner' for a different look
                                            onChange={changeBedTime}
                                        />
                                    )
                                }
                            </View>
                        </View>
                    </View>

                    <Pressable className="bg-red-100 border border-red-400 py-3 px-5 rounded-full items-center"
                        onPress={async () => {
                            await resetApp();
                            console.log("User and hydration data deleted");
                        }}
                    >
                        <Text className="text-red-400 text-3xl">Reset App Data</Text>
                    </Pressable>

                    {isSaveComplete && (<Modal
                        transparent={true}
                        visible={isSaveComplete}
                        animationType="fade"
                    >
                        <TouchableWithoutFeedback onPress={() => setIsSaveComplete(null)}>
                            <View className="flex-1 justify-center items-center bg-black/50 px-10">
                                <View className="justify-between bg-white rounded-3xl w-[90%] px-4 gap-5 py-4">
                                    <Text className="text-2xl">Saved Successfully!!!</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>)}
                </View>
            </View>
        </SafeAreaView>
    )
}

function setHydrationData(updatedHydrationData: { dailyGoal: number; reminders: Date[]; waterPerReminder: number; activeHours: number; waterDrank: number; date: string; }) {
    throw new Error("Function not implemented.");
}
