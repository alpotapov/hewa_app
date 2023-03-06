import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

// eslint-disable-next-line react/prop-types
function OrangeButton({ onPress, title, icon, margins, innerWhite }) {
  const innerColor = innerWhite ? 'bg-white' : 'bg-sunset-orange';
  const innerTextColor = innerWhite ? 'text-sunset-orange' : 'text-white';
  if (!icon) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className={`${innerColor} rounded-2xl border border-sunset-orange ${margins}`}
      >
        <View className="flex flex-row justify-between items-center h-14">
          <Text className={`flex-1 ${innerTextColor} text-center font-bold`}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className={`${innerColor} rounded-2xl px-6 ${margins}`}
      onPress={onPress}
    >
      <View className="flex flex-row justify-between items-center h-14">
        <Image className="flex-none w-6 h-6" source={icon} />
        <Text className={`flex-1 ${innerTextColor} text-center font-bold`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default OrangeButton;
