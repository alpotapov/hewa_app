import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-native';

import walletDomain from '../../domain/wallet';

import WalletEntry from './components/WalletEntry';

import Logo from './assets/Logo.png';
import PlusIcon from './assets/PlusIcon.png';

export default function Dashboard() {
  const navigate = useNavigate();

  const navigateToFirstFlow = () => {
    navigate('/first-flow');
  }
  const navigateToBackup = () => {
    navigate('/create-wallet');
  }

  const [walletEntries, setWalletEntries] = React.useState([]);
  const [showBackupWarning, setShowBackupWarning] = React.useState(true);

  React.useEffect(() => {
    // walletDomain.clear()
    walletDomain.readAll().then((entries) => {
      setWalletEntries(entries);
    });
  }, []);

  return (
    <View className="h-full">
      <View className="flex-none h-40 flex flex-col justify-center">
        {showBackupWarning 
          ? (
            <View className="">
              <TouchableOpacity className="bg-red-300 rounded-lg mx-6 px-6" onPress={navigateToBackup}>
                <View className="flex flex-row justify-between items-center h-14 ">
                  <Image className="flex-none w-6 h-6" source={PlusIcon} />
                  <Text className="flex-1 text-white text-center font-bold">Create Backup</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
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
      <ScrollView className="space-y-2 px-6">
        {walletEntries.map((entry) => <WalletEntry entry={entry} key={entry.value} />)}
      </ScrollView>
    </View>
  );
}
