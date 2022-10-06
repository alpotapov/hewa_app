import { ethers } from "ethers";
import testGuidsRepository from "../repository/testGuids";
import secretsRepository from "../repository/secrets";

const createFromGuid = (guid) => {
  return {
    value: guid,
    localData: {
      testType: 'B16',
      dateCreated: Date.now(),
      status: 'Pending'
    }
  }
}

const validateGuid = (guid) => {
  return true;
}

const handleInput = async (guid) => {
  // return codes:
  // - 0 : ok
  // - 1 : entry already exists
  // - 2 : saving error

  // const isValid = validateGuid(guid);
  const newEntry = createFromGuid(guid);
  const result = await testGuidsRepository.save(newEntry);

  return result;
}

const readAll = async () => {
  const guids = await testGuidsRepository.read();
  return guids;
}

const createWallet = async () => {
  const wallet = ethers.Wallet.createRandom();
  console.log({ wallet });
  await secretsRepository.savePrivateKey(wallet.privateKey)
}

export default {
  readAll,
  handleInput,
  clear: testGuidsRepository.clear,
  createWallet,
}