import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

import PlusIcon from '../assets/PlusIconPacificBlue.png';

// eslint-disable-next-line react/prop-types
function WhiteButton({ onPress, title, margins }) {
  return (
    <TouchableOpacity
      className={`bg-white rounded-2xl px-7 ${margins}`}
      onPress={onPress}
    >
      <View className="flex flex-row justify-between items-center h-14">
        <Image className="flex-none w-4 h-4" source={PlusIcon} />
        <Text className="flex-1 text-pacific-blue text-center font-bold">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default WhiteButton;
