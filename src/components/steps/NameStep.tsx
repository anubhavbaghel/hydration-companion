import { Text, TextInput, View } from "react-native";

export default function nameStep({ setName, name }) {

    return (
        <View className="items-center px-5 flex-1 max-h-[50%] justify-evenly" >
            <View className="items-center gap-3">
                <Text className="text-black text-4xl font-semibold">Your Name</Text>
                <Text className="text-gray-700 ">Help us personalize your experience</Text>
            </View>
            <View className="justify-start">
                <TextInput
                    value={name}
                    onChangeText={newText => setName(newText)}
                    autoComplete="name"
                    multiline={false}
                    numberOfLines={1}
                    placeholder="Enter your name here..."
                    className="bg-gray-100 rounded-full px-5 py-3 text-2xl min-w-10 w-[70%] border border-gray-400 text-center">
                </TextInput>
            </View>
        </View>
    )
}
