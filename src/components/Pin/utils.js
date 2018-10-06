import { AsyncStorage } from 'react-native';

const STORAGE_PREFS_PIN = '@HTH:preferences:PIN';

export const getKey = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_PREFS_PIN);
    return value;
  } catch (error) {
    // console.log('Error getting PIN data' + error);
  }
};

export const saveKey = async value => {
  try {
    await AsyncStorage.setItem(STORAGE_PREFS_PIN, value);
  } catch (error) {
    // console.log('Error saving PIN data' + error);
  }
};

export const resetKey = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_PREFS_PIN);
    const value = await AsyncStorage.getItem(STORAGE_PREFS_PIN);
    return value;
  } catch (error) {
    // console.log('Error resetting PIN data' + error);
  }
};

export const validateKey = async pin => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_PREFS_PIN);
    return pin === value;
  } catch (error) {
    // console.log('Error getting PIN data' + error);
  }
};
