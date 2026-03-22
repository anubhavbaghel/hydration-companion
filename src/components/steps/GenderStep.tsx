import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { Pressable, Text, View } from "react-native";


export default function GenderStep({ setGender, gender }) {

  return (
    <View className="flex items-center justify-center gap-20 px-5 ">
      <View className="items-center gap-2">
        <Text className="text-3xl font-semibold text-gray-700">Select Gender </Text>
        <Text className="text-gray-600">Help us personalize your experience</Text>
      </View>
      <View className="flex flex-row items-center justify-center gap-5">

        <Pressable
          className={`py-3 border items-center justify-center flex-1 rounded-3xl ${gender === "Male"
            ? "bg-blue-200 border-blue-600"  // Selected State
            : "bg-white border-gray-200"     // Unselected State
            }`} onPress={() => {
              setGender("Male");
              Haptics.performAndroidHapticsAsync(
                Haptics.AndroidHaptics.Clock_Tick
              );
              console.log("Gender Selected Male")

            }}
        >

          <Image source={require("../../../assets/media/gender-boy.avif")} style={{ width: 150, height: 200 }} />
          <Text className="text-2xl font-medium text-gray-600">Male</Text>
        </Pressable>

        <Pressable className={`py-3 border items-center justify-center flex-1 rounded-3xl ${gender === "Female"
          ? "bg-pink-200 border-pink-600"  // Selected State
          : "bg-white border-gray-200"     // Unselected State
          }`}
          onPress={() => {
            setGender("Female");
            Haptics.performAndroidHapticsAsync(
              Haptics.AndroidHaptics.Clock_Tick
            );
            console.log("Gender Selected Female")
          }}>
          <Image source={require("../../../assets/media/gender-girl.avif")} style={{ width: 150, height: 200 }} />
          <Text className="text-2xl font-medium text-gray-600">Female</Text>
        </Pressable>
      </View>

    </View >
  );
}