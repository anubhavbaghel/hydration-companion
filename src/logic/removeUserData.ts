import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';

export const deleteAppData = async () => {
  try {
    await AsyncStorage.multiRemove([
      "USER_DATA",
      "hydration_DATA"
    ]);
    console.log('User Data Succesfully deleted')
  } catch (error) {
    console.error("Failed to delete app data:", error);
  }

  try {
    Notifications.dismissAllNotificationsAsync();
    console.log("All Notifications deleted successfully")
  } catch (error) {
    console.error ("Failed to dismiss all the notifications");
  }
};