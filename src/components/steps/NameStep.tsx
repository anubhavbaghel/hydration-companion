import { Text, TextInput, View } from "react-native";

export default function nameStep({setName, name}) {
    
    return (
        <View className="justify-center">
            <Text>I wonder what is your name?🤔</Text>
            <View>
                <Text>I'm</Text>
                <TextInput
                    value={name}
                    placeholder="Enter Your Name"
                    onChangeText={newText => setName(newText)}
                    autoComplete="name">
                </TextInput>
            </View>
        </View>
    )
}
