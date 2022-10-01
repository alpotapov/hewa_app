import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';

import Logo from './assets/Logo.png';
import PlusIcon from './assets/PlusIcon.png';

export default function Dashboard() {
  const navigate = useNavigate();

  const navigateToFirstFlow = () => {
    navigate('/first-flow');
  }

  return (
    <View className="h-full">
      <View className="flex-1 space-y-6 flex flex-col justify-center">
        <View className="flex-none px-6">
          <Text className="text-lg text-cornflower">Dashboard</Text>
        </View>
        <TouchableOpacity className="bg-cornflower rounded-lg mx-6 px-6" onPress={navigateToFirstFlow}>
          <View className="flex flex-row justify-between items-center h-14 ">
            <Image className="flex-none w-6 h-6" source={PlusIcon} />
            <Text className="flex-1 text-white text-center font-bold">New Test</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-none flex justify-between items-center mb-2">
          <Image className="w-32 h-8 overflow-visible" source={Logo} />
      </View>
    </View>
  );
}
