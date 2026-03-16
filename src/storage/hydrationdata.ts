import AsyncStorage from "@react-native-async-storage/async-storage";

const HYDRATION_DATA_KEY = "hydration_DATA";

export const saveHydrationData = async (data) => {
    try {
        await AsyncStorage.setItem(HYDRATION_DATA_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving hydration data:", error);
    }
}

export const loadHydrationData = async () => {
    try {
        const data = await AsyncStorage.getItem(HYDRATION_DATA_KEY);

        if (!data) return null;

        const parsed = JSON.parse(data);

        return parsed;

    } catch (error) {
        console.error("Error getting hydration data:", error);
        return null;
    }
}