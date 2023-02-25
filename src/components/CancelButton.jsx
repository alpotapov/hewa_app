import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

import CancelIcon from '../assets/CancelIcon.png';

// eslint-disable-next-line react/prop-types
function CancelButton({ onPress, title, margins }) {
  return (
    <TouchableOpacity
      className={`bg-mercury rounded-2xl px-6 ${margins}`}
      onPress={onPress}
    >
      <View className="flex flex-row justify-between items-center h-14">
        <Image className="flex-none w-6 h-6" source={CancelIcon} />
        <Text className="flex-1 text-gray text-center font-bold">{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CancelButton;
