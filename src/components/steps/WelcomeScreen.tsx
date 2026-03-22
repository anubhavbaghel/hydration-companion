import { Image } from 'expo-image';
import { Text, View } from "react-native";

export default function WelcomeScreen({ step, setStep }) {

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }} className=" gap-5">
            <Image source={require("../../../assets/media/hydra.avif")} style={{ width: 150, height: 300 }} />
            <Text className="text-4xl font-semibold">Hi I am Hydra.</Text>
            <Text className="text-gray-600 text-xl text-center">I&apos;m here to help you stay refreshed, {`\n`}energized, and perfectly hydrated {`\n`}every day!</Text>
        </View >
    );
}
