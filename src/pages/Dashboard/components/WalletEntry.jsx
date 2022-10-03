import React from 'react';

import { View, Text } from 'react-native';

import CardResultPending from './CardResultPending';

const WalletEntry = ({ entry }) => {
  return (
    <View className="mt-6">
      <CardResultPending entry={entry} />
    </View>
  )
}

export default WalletEntry;
