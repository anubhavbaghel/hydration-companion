import { Text, View } from "react-native"

const LoadingScreen = () => {
    return(
            <View className="flex-1 items-center justify-center gap-5 bg-white">
                <Text className="text-4xl text-blue-400 font-bold">Hydra</Text>
                <Text className="text-lg text-gray-500">Loading your data...</Text>
            </View>
        )
    }

export default LoadingScreen
