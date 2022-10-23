import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useQueryClient, useQuery } from '@tanstack/react-query';

import walletDomain from '../domain/wallet';

export default () => {
  const [walletEntries, setWalletEntries] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // const queryClient = useQueryClient();
  const { data } = useQuery(['wallet'], () =>
    walletDomain.Wallet.checkResults(walletEntries.map((entry) => entry.value))
  );

  React.useEffect(() => {
    setWalletEntries(data);
  }, [data]);

  React.useEffect(() => {
    const loadWallet = async () => {
      // await walletDomain.clear();
      try {
        const loadedEntries = await walletDomain.Wallet.load();
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
