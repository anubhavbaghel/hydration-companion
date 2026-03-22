import Slider from "@react-native-community/slider";
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { Text, View } from "react-native";


export default function WeightStep({ weight, setWeight, gender }) {

  return (
    <View className="items-center gap-2">
      <Text className="text-3xl font-semibold text-gray-700">Select Your Weight (kg)</Text>
      <Text className="text-gray-600 text-center">Help us calculate your daily water goal{`\n`} based on your weight.</Text>

      {(gender === "Male") ? (<Image source={require("../../../assets/media/boy-on-weighing-machine.avif")} style={{ width: 100, height: 300 }} />) : (<Image source={require("../../../assets/media/girl-on-weighing-machine.avif")} style={{ width: 100, height: 300 }} />)}

      <Text className="text-2xl font-semibold text-gray-700">{weight} kg</Text>
      <Slider
        style={{ width: 250, height: 40 }}
        minimumValue={30}
        maximumValue={150}
        step={1}
        value={weight || 70}
        onValueChange={
          (value) => {
            setWeight(value);

            Haptics.performAndroidHapticsAsync(
              Haptics.AndroidHaptics.Clock_Tick
            );
            console.log('Weight Selected')
            console.log(value)
          }
        }
        minimumTrackTintColor="#3B82F6"
        maximumTrackTintColor="#D1D5DB"
      />

    </View>
  );
}