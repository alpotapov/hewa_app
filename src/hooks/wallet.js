import React from 'react';
import { useQuery } from '@tanstack/react-query';

import walletDomain from '../domain/wallet';

export default () => {
  const [walletEntries, setWalletEntries] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // const queryClient = useQueryClient();
  const { data, refetch } = useQuery(
    ['wallet'],
    walletDomain.Wallet.checkResults
  );

  React.useEffect(() => {
    setWalletEntries(data);
  }, [data]);

  React.useEffect(() => {
    const loadWallet = async () => {
      // await walletDomain.clear();
      try {
        const loadedEntries = await walletDomain.Wallet.load();
        console.log(JSON.stringify(loadedEntries, null, 2));
        setWalletEntries(loadedEntries);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadWallet();
  }, []);

  const clear = async () => {
    await walletDomain.clear();
    refetch();
  };

  return { walletEntries, isLoading, refetch, clear };
};
