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
    throw new Error('Entry with guid already exists');
  }
  await AsyncStorage.setItem(
    'guidList',
    JSON.stringify([guid, ...existingGuids])
  );
};

const setPushToken = async (guid, pushToken) => {
  const existingEntries = await read();
  const updatedEntries = existingEntries.map((entry) => {
    if (entry.value === guid) {
      return {
        ...entry,
        localData: {
          ...entry.localData,
          pushToken: pushToken.toString(),
        },
      };
    }
    return entry;
  });

  await AsyncStorage.setItem('guidList', JSON.stringify(updatedEntries));
};

const updateMany = async (guids, remoteData, status) => {
  const existingEntries = await read();
  const updatedEntries = existingEntries.map((entry) => {
    const index = guids.indexOf(entry.value);
    if (index >= 0) {
      return {
        ...entry,
        remoteData: {
          ...entry.remoteData,
          ...remoteData[index].remoteData,
        },
        localData: {
          ...entry.localData,
          status,
        },
      };
    }
    return entry;
  });

  try {
    await AsyncStorage.setItem('guidList', JSON.stringify(updatedEntries));
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

const get = async (guid) => {
  const existingGuids = await read();
  const matching = existingGuids.find((entry) => entry.value === guid);
  return matching;
};

export default {
  save,
  setPushToken,
  updateMany,
  read,
  count,
  clear,
  get,
};
