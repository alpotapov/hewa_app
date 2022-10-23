import React from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import resultService from '../services/result';
import testGuidsRepository from '../repository/testGuids';

class Wallet {
  static async load() {
    const walletEntries = await testGuidsRepository.read();
    return walletEntries;
  }

  static async update(guid, remoteData) {
    await testGuidsRepository.update(guid, remoteData);
  }

  static async checkResults() {
    const walletEntries = await Wallet.load();
    const entriesToCheck = walletEntries.filter((entry) =>
      Wallet.statusesToCheck.includes(entry.localData.status)
    );
    const guids = entriesToCheck.map((entry) => entry.value);

    console.log({ guids: `${guids.join(';')}` });
    try {
      const entries = await resultService.checkResults(guids);
      await Wallet.updateMany(
        guids,
        entries.map((entry) => entry.remoteData)
      );
      const updatedEntries = await Wallet.load();
      return updatedEntries;
    } catch (error) {
      console.error(error);
    }

    return walletEntries;
  }
}

Wallet.statusesToCheck = ['Pending', 'Analyzing'];

export default () => {
  const [walletEntries, setWalletEntries] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();
  // eslint-disable-next-line no-unused-vars
  const query = useQuery(['wallet'], () => Wallet.checkResults());

  // React.useEffect(() => {
  //   console.log({ query });
  // }, [query]);

  React.useEffect(() => {
    const loadWallet = async () => {
      try {
        const loadedEntries = await Wallet.load();
        console.log({ loadedEntries });
        setWalletEntries(loadedEntries);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadWallet();
  }, []);

  return { walletEntries, isLoading };
};
