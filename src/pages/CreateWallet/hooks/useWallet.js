import React from 'react';
import walletDomain from '../../../domain/wallet';

export default () => {
  const [wallet, setWallet] = React.useState(null);

  const createWallet = async () => {
    const newWallet = await walletDomain.createWallet();
    setWallet(newWallet);
  }

  const createBackup = async (assignDefaultGuardian) => {
    const encrypted = await walletDomain.exportEncryptedBackup();

    console.log(encrypted);
  };

  React.useEffect(() => {
    walletDomain.loadWallet().then((existingWallet) => {
      setWallet(existingWallet);
    })
  }, []);

  return {
    wallet,
    createWallet,
    createBackup,
  }
}