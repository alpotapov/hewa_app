import React from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigate } from 'react-router-native';

import PlusIcon from './assets/PlusIcon.png';
import Logo from './assets/Logo.png';

const Backup = () => {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate('/dashboard');
  }

  const onStartBackup = () => {
    console.log('creating backup');
  }
  
  return (
    <View className="h-full">
      <View className="flex-1 space-y-6 flex flex-col justify-center">
        <View className="flex-none px-6">
          <Text className="text-lg text-cornflower">Create backup to have your medical records stored forever.</Text>
          <Text className="text-lg text-cornflower">Backup is encrypted and is only accessible to you.</Text>
        </View>
        <TouchableOpacity className="bg-cornflower rounded-lg mx-6 px-6" onPress={onStartBackup}>
          <View className="flex flex-row justify-between items-center h-14 ">
            <Image className="flex-none w-6 h-6" source={PlusIcon} />
            <Text className="flex-1 text-white text-center font-bold">Create Backup</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-300 rounded-lg mx-6 px-6" onPress={navigateToDashboard}>
          <View className="flex flex-row justify-between items-center h-14 ">
            <Image className="flex-none w-6 h-6" source={PlusIcon} />
            <Text className="flex-1 text-white text-center font-bold">Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-none flex justify-between items-center mb-2">
          <Image className="w-32 h-8 overflow-visible" source={Logo} />
      </View>
    </View>
  )
}

export default Backup;
