import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';

import Logo from './assets/Logo.png';
import PlusIcon from './assets/PlusIcon.png';
import Explainer2 from './assets/Explainer2.png';

export default function FirstViewSuccess() {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate('/dashboard');
  }

  return (
    <View className="h-full">
      <View className="flex-1 space-y-6 flex flex-col justify-center">
        <View className="flex-none px-6">
          <Text className="text-lg text-cornflower">You can now proceed with the blood test.</Text>
          <Text className="text-lg text-cornflower">Results will be ready ~15 minutes after you insert the test cartridge into the DxReader.</Text>
          <Text className="text-lg text-cornflower">HealthWallet will download results as soon as they are available and notify you.</Text>
        </View>
        <View className="flex items-center">
          <Image className="h-64 w-64" resizeMode="contain" source={Explainer2} />
        </View>
        <TouchableOpacity className="bg-cornflower rounded-lg mx-6 px-6" onPress={navigateToDashboard}>
          <View className="flex flex-row justify-between items-center h-14 ">
            <Image className="flex-none w-6 h-6" source={PlusIcon} />
            <Text className="flex-1 text-white text-center font-bold">To test results overview</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-none flex justify-between items-center mb-2">
          <Image className="w-32 h-8 overflow-visible" source={Logo} />
      </View>
    </View>
  );
}
