import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_DATA_KEY = "USER_DATA";

export const saveUserData = async (data) => {
    try {
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving user data:", error);
    }
}

export const loadUserData = async () => {
    try {
        const data = await AsyncStorage.getItem(USER_DATA_KEY);

        if (!data) return null;

        const parsed = JSON.parse(data);

        parsed.wakeTime = new Date(parsed.wakeTime);
        parsed.bedTime = new Date(parsed.bedTime);

        return parsed;

    } catch (error) {
        console.error("Error getting user data:", error);
        return null;
    }
}