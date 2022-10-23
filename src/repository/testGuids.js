import AsyncStorage from '@react-native-async-storage/async-storage';

const read = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('guidList');
    const result = jsonValue ? JSON.parse(jsonValue) : [];
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const exists = async (guidToCheck) => {
  const existingGuids = await read();
  const matching = existingGuids.find(
    (guid) => guid.value === guidToCheck.value
  );
  return !!matching;
};

const save = async (guid) => {
  const existingGuids = await read();
  const alreadyExists = await exists(guid);
  if (alreadyExists) {
    return 1;
  }
  try {
    await AsyncStorage.setItem(
      'guidList',
      JSON.stringify([guid, ...existingGuids])
    );
    return 0;
  } catch (e) {
    console.error(e);
    return 2;
  }
};

const update = async (guid, remoteData) => {
  const existingGuids = await read();
  const updatedGuids = existingGuids.map((entry) => {
    if (entry.value === guid) {
      return {
        ...entry,
        remoteData: {
          ...entry.remoteData,
          ...remoteData,
        },
      };
    }
    return entry;
  });

  try {
    await AsyncStorage.setItem('guidList', JSON.stringify(updatedGuids));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const count = async () => {
  const existingGuids = await read();
  return existingGuids.length;
};

const clear = async () => {
  const keysToRemove = ['guidList'];
  try {
    await AsyncStorage.multiRemove(keysToRemove);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default {
  save,
  update,
  read,
  count,
  clear,
};
