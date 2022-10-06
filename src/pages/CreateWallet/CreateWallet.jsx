import React from 'react';

import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigate } from 'react-router-native';

import useWallet from './hooks/useWallet';

import PlusIcon from './assets/PlusIcon.png';
import Logo from './assets/Logo.png';

export default () => {
  const [recoveryEmail, onRecoveryEmailChange] = React.useState('');
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate('/dashboard');
  }

  const { wallet, createWallet } = useWallet();

  React.useEffect(() => {
    console.log({ wallet });
    if(wallet) {
      navigate('/backup');
    }
  }, [wallet]);

  return (
    <View className="h-full">
      <View className="flex-none flex flex-row justify-end items-center">
        <TouchableOpacity 
          className="flex-none h-10 px-6 mt-2 w-1/2 flex flex-row justify-end items-center"
          onPress={navigateToDashboard}
        >
          <Text className="flex-shrink text-cornflower">Return to Dashboard</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 space-y-6 flex flex-col justify-center">
        <View className="flex-none px-6">
          <Text className="text-lg text-cornflower">Create new wallet or recover existing one.</Text>
        </View>
        <TouchableOpacity className="bg-cornflower rounded-lg mx-6 px-6" onPress={createWallet}>
          <View className="flex flex-row justify-between items-center h-14 ">
            <Image className="flex-none w-6 h-6" source={PlusIcon} />
            <Text className="flex-1 text-white text-center font-bold">Create New Wallet</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-none flex justify-between items-center mb-2">
          <Image className="w-32 h-8 overflow-visible" source={Logo} />
      </View>
    </View>
  )
}
