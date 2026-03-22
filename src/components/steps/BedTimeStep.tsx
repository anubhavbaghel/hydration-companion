import DateTimePicker from '@react-native-community/datetimepicker';
import { Image } from 'expo-image';
import { useState } from "react";
import { Pressable, Text, View } from "react-native";


export default function BedTimeStep({ setBedTime, gender }) {

    const defaultBedTime = new Date();
    defaultBedTime.setHours(22);
    defaultBedTime.setMinutes(0);
    defaultBedTime.setSeconds(0);

    const [date, setDate] = useState(defaultBedTime);
    const [show, setShow] = useState(false);
    const [istimePicked, setIsTimePicked] = useState(false);


    const onChange = (event, selectedDate) => {

        if (selectedDate) {
            setDate(selectedDate);
            setBedTime(selectedDate);
            setShow(false);
            setIsTimePicked(true);
            console.log(new Date(selectedDate))
        }
    };
    const showTimepicker = () => {
        setShow(true);
    };

    return (
        <View className='flex items-center justify-center gap-20'>
            <View className='flex items-center gap-5'>
                <Text className="text-5xl font-semibold text-gray-700">Bed Time</Text>
                <Text className="text-xl text-gray-600 text-center">Select the time you usually go to bed.</Text>
            </View>

            {(gender === 'Male') ? (<Image source={require("../../../assets/media/bedtime-boy.avif")} style={{ height: 200, width: 200 }} />) : (<Image source={require("../../../assets/media/bedtime-girl.avif")} style={{ height: 200, width: 200 }} />)}

            <Pressable onPress={showTimepicker} className="px-4 py-4 rounded-3xl bg-[#F3E1C5] border border-[#D2C3AF] flex-row items-center gap-5 shadow-xl" >
                {(istimePicked) ? <Text className='text-3xl text-[#0D213A] font-bold'>Change Bed Time</Text> : <Text className='text-3xl text-[#0D213A] font-bold'>Pick Bed Time</Text>}
                <Image source={require("../../../assets/media/clock.avif")} style={{ height: 36, width: 36 }} />
            </Pressable>

            {istimePicked && (
                <View className='bg-[#E7EBEE] px-5 py-3 border border-[#BEBEC0] rounded-3xl items-center'>
                    <Text className='font-bold'>I GO TO BED AT:</Text>
                    <Text className='text-6xl  text-[#03122B]'>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toUpperCase()}</Text>
                </View>
            )}
            {
                show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={defaultBedTime}
                        mode="time"
                        is24Hour={false}
                        display="default" // or 'spinner' for a different look
                        onChange={onChange}
                    />
                )
            }

        </View>
    );
}