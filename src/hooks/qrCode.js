import React from 'react';
import walletDomain from '../domain/wallet';

export default () => {
  const [scanningFinished, setScanningFinished] = React.useState(false);
  const [parsedEntry, setParsedEntry] = React.useState(null);

  const onResult = (qrCodeData) => {
    const entry = JSON.parse(qrCodeData);
    const parsed = walletDomain.Wallet.parseEntry(entry);
    setParsedEntry(parsed);
  };

  const saveResult = (onAfterSave) => {
    walletDomain.Wallet.save(parsedEntry)
      .then(onAfterSave)
      .catch((error) => console.error(error))
      .finally(() => {
        setScanningFinished(true);
      });
  };

  const resetResult = () => {
    setParsedEntry(undefined);
  };

  return {
    onResult,
    resetResult,
    saveResult,
    scanningFinished,
    parsedEntry,
  };
};
