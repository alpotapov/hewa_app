import 'react-native-get-random-values';
import 'node-libs-expo/globals';
import '@ethersproject/shims';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import testGuidsRepository from '../repository/testGuids';
import resultService from '../services/result';

const generateExpoPushToken = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Failed to get push token');
      }
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }

  throw new Error('Not a mobile device');
};
class Wallet {
  static async load() {
    const walletEntries = await testGuidsRepository.read();
    return walletEntries;
  }

  static async save(formattedEntry) {
    const { value: guid } = formattedEntry;

    if (!guid) throw new Error('No guid provided');

    await testGuidsRepository.save(formattedEntry);

    generateExpoPushToken()
      .then((pushToken) => testGuidsRepository.setPushToken(guid, pushToken))
      .then(() => testGuidsRepository.get(guid))
      .then((entry) => {
        resultService.subscribeToResult(guid, entry.localData.pushToken);
      });
  }

  static async updateMany(guids, remoteData, status) {
    await testGuidsRepository.updateMany(guids, remoteData, status);
  }

  static parseEntry(entry) {
    if (!entry.uuid || !entry.testType) {
      throw new Error('Invalid entry');
    }
    const parsed = {
      value: entry.uuid,
      localData: {
        status: 'Pending',
        dateCreated: Date.now(),
        testType: entry.testType,
      },
    };

    return parsed;
  }

  static async checkResults() {
    console.log('Checking results');
    const walletEntries = await Wallet.load();
    const entriesToCheck = walletEntries.filter((entry) =>
      Wallet.statusesToCheck.includes(entry.localData.status)
    );
    const guids = entriesToCheck.map((entry) => entry.value);
    const guidsString = guids.join(',');

    if (guidsString === '') return walletEntries;
    try {
      const publishedResults = await resultService.checkResults(guids);

      const guidsWithUpdates = publishedResults.reduce(
        (acc, result, index) => {
          if (result !== {}) {
            if (guids[index] !== result.id) {
              return acc;
            }
            acc.guids.push(result.id);
            acc.results.push(result.valueQuantity);
          }
          return acc;
        },
        { guids: [], results: [] }
      );

      await Wallet.updateMany(
        guidsWithUpdates.guids,
        guidsWithUpdates.results.map((result) => ({
          remoteData: { ...result },
        })),
        'ResultReceived'
      );
      const updatedEntries = await Wallet.load();
      return updatedEntries;
    } catch (error) {
      console.log('???', error.message);
      console.error(JSON.stringify(error.me));
      return walletEntries;
    }
  }
}

Wallet.statusesToCheck = ['Pending', 'Analyzing'];

export default {
  clear: testGuidsRepository.clear,
  Wallet,
};
