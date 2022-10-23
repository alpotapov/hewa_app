import 'react-native-get-random-values';
import 'node-libs-expo/globals';
// eslint-disable-next-line no-unused-vars
import crypto from 'msrcrypto';
// eslint-disable-next-line no-unused-vars
import { TextEncoder, TextDecoder } from 'fastestsmallesttextencoderdecoder';
import LitJsSDK, { LitNodeClient } from 'lit-js-sdk-no-wasm';
import '../../shim';
import '@ethersproject/shims';
import 'text-encoding-polyfill';

import { ethers } from 'ethers';
import testGuidsRepository from '../repository/testGuids';
import secretsRepository from '../repository/secrets';
import resultService from '../services/result';

class Wallet {
  static async load() {
    const walletEntries = await testGuidsRepository.read();
    return walletEntries;
  }

  static async save(formattedEntry) {
    const { value: guid } = formattedEntry;

    if (!guid) throw new Error('No guid provided');

    await testGuidsRepository.save(formattedEntry);
  }

  static async update(guid, remoteData) {
    await testGuidsRepository.update(guid, remoteData);
  }

  static async updateMany(guids, remoteData, status) {
    await testGuidsRepository.updateMany(guids, remoteData, status);
  }

  static parseEntry(entry) {
    if (!entry.guid || !entry.localData.testType) {
      throw new Error('Invalid entry');
    }
    const parsed = {
      value: entry.guid,
      localData: {
        status: 'Pending',
        dateCreated: Date.now(),
        testType: entry.localData.testType,
      },
    };

    return parsed;
  }

  static async checkResults() {
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
          if (result !== '') {
            acc.guids.push(guids[index]);
            acc.results.push(result);
          }
          return acc;
        },
        { guids: [], results: [] }
      );

      await Wallet.updateMany(
        guidsWithUpdates.guids,
        guidsWithUpdates.results.map((result) => ({ remoteData: { result } })),
        'ResultReceived'
      );
      const updatedEntries = await Wallet.load();
      return updatedEntries;
    } catch (error) {
      console.error(error);
      return walletEntries;
    }
  }
}

Wallet.statusesToCheck = ['Pending', 'Analyzing'];

const readAll = async () => {
  const guids = await testGuidsRepository.read();
  return guids;
};

const exportAsJSONString = async () => {
  const guids = await readAll();
  return JSON.stringify(guids);
};

const createWallet = async () => {
  const wallet = ethers.Wallet.createRandom();
  console.log({ wallet });
  await secretsRepository.savePrivateKey(wallet.privateKey);
};

const loadWallet = async () => {
  const pk = await secretsRepository.readPrivateKey();
  if (pk) {
    const wallet = new ethers.Wallet(pk);
    return wallet;
  }

  return null;
};

const encryptWithLit = async (data, dataAccessTokenId) => {
  const chain = 'ethereum';
  const accessControlConditions = [
    {
      contractAddress: '',
      standardContractType: 'ERC721',
      chain,
      method: 'ownerOf',
      parameters: [dataAccessTokenId],
      returnValueTest: {
        comparator: '=',
        value: ':userAddress',
      },
    },
  ];
  const authSig = await LitJsSDK.checkAndSignAuthMessage({ chain });
  const { encryptedString, symmetricKey } = await LitJsSDK.encryptString(data);
  const encryptedSymmetricKey = await LitNodeClient.saveEncryptionKey({
    accessControlConditions,
    symmetricKey,
    authSig,
    chain,
  });

  const packagedData = JSON.stringify({
    encryptedString,
    encryptedSymmetricKey,
    accessControlConditions,
  });

  return packagedData;
};

const exportEncryptedBackup = async () => {
  const data = await exportAsJSONString();
  console.log({ data });
  const encrypted = await encryptWithLit(data);
  return encrypted;
};

export default {
  readAll,
  clear: testGuidsRepository.clear,
  exportAsJSONString,
  createWallet,
  loadWallet,
  exportEncryptedBackup,
  Wallet,
};
