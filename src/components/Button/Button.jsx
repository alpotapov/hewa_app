import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

// eslint-disable-next-line react/prop-types
function Button({ onPress, title, icon, margins }) {
  if (!icon) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className={`bg-pacific-blue rounded-2xl ${margins}`}
      >
        <View className="flex flex-row justify-between items-center h-14">
          <Text className="flex-1 text-white text-center font-bold">
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className={`bg-pacific-blue rounded-2xl ${margins}`}
      onPress={onPress}
    >
      <View className="flex flex-row justify-between items-center h-14">
        <Image className="flex-none w-6 h-6" source={icon} />
        <Text className="flex-1 text-white text-center font-bold">{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Button;
