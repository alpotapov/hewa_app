import AsyncStorage from '@react-native-async-storage/async-storage';

const savePrivateKey = async (privateKey) => {
  try {
    await AsyncStorage.setItem('pk', privateKey);
  } catch (e) {
    console.error(e);
  }
}

const readPrivateKey = async () => {
  try {
    const privateKey = await AsyncStorage.getItem('pk');
    return privateKey;
  } catch (e) {
    console.error(e);
  }
}

export default {
  savePrivateKey,
  readPrivateKey,
}