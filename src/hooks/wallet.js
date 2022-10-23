import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useQueryClient, useQuery } from '@tanstack/react-query';

import walletDomain from '../domain/wallet';

export default () => {
  const [walletEntries, setWalletEntries] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // eslint-disable-next-line no-unused-vars
  // const queryClient = useQueryClient();
  // eslint-disable-next-line no-unused-vars
  // const query = useQuery(['wallet'], () => walletDomain.Wallet.checkResults());

  // React.useEffect(() => {
  //   console.log({ query });
  // }, [query]);

  React.useEffect(() => {
    const loadWallet = async () => {
      // await walletDomain.clear();
      try {
        const loadedEntries = await walletDomain.Wallet.load();
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
