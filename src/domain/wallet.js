import 'react-native-get-random-values';
import 'node-libs-expo/globals';
import crypto from 'msrcrypto';
import { TextEncoder, TextDecoder } from 'fastestsmallesttextencoderdecoder';
import LitJsSDK, { LitNodeClient } from 'lit-js-sdk-no-wasm';
import '../../shim';
import '@ethersproject/shims';
import 'text-encoding-polyfill';

import { ethers } from 'ethers';
import testGuidsRepository from '../repository/testGuids';
import secretsRepository from '../repository/secrets';

const createFromGuid = (guid) => {
  return {
    value: guid,
    localData: {
      testType: 'B16',
      dateCreated: Date.now(),
      status: 'Pending',
    },
  };
};

const validateGuid = (guid) => {
  return true;
};

const handleInput = async (guid) => {
  // return codes:
  // - 0 : ok
  // - 1 : entry already exists
  // - 2 : saving error

  // const isValid = validateGuid(guid);
  const newEntry = createFromGuid(guid);
  const result = await testGuidsRepository.save(newEntry);

  return result;
};

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
  handleInput,
  clear: testGuidsRepository.clear,
  exportAsJSONString,
  createWallet,
  loadWallet,
  exportEncryptedBackup,
};
