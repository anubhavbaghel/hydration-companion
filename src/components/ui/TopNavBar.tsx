import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import SettingsIcon from "../../../assets/icons/settings.svg";

export default function TopNavBar() {

    return (
        <View className="flex-row justify-end w-full py-2">
            <Link href="/settingspage" asChild className="px-5">
                <Pressable>
                    <SettingsIcon fill={"gray"}/>
                </Pressable>
            </Link>
        </View>
    )
}