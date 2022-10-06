import React from 'react';
import walletDomain from '../../../domain/wallet';

export default () => {
  const [wallet, setWallet] = React.useState(null);

  const createWallet = async () => {
    const newWallet = await walletDomain.createWallet();
    setWallet(newWallet);
  }

  React.useEffect(() => {
    walletDomain.loadWallet().then((existingWallet) => {
      setWallet(existingWallet);
    })
  }, []);

  return {
    wallet,
    createWallet,
  }
}