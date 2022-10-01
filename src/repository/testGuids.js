import AsyncStorage from '@react-native-async-storage/async-storage';

const read = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('guidList');
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

const exists = async (guidToCheck) => {
  const existingGuids = await read();
  const matching = existingGuids.find((guid) => guid === guidToCheck);
  return !!matching;
}

const save = async (guid) => {
  const existingGuids = await read();
  const alreadyExists = await exists(guid);
  if (alreadyExists) {
    return 1;
  }
  try {
    await AsyncStorage.setItem('guidList', JSON.stringify([
      guid,
      ...existingGuids
    ]));
    return 0;
  } catch (e) {
    console.error(e);
    return 2;
  }
}

const count = async () => {
  const existingGuids = await read();
  return existingGuids.length;
}

export default {
  save,
  read,
  count,
}