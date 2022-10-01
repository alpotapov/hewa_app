import { Text, View, TouchableOpacity, Image } from 'react-native';

import PlusIcon from './assets/PlusIcon.png'
import Logo from './assets/Logo.png';

export default function FirstView() {
  const onAddTestPress = () => {
    alert('Starting Scan');
  }
  return (
    <View className="h-full space-y-4">
      <View className="flex-1 flex flex-col justify-around">
        <TouchableOpacity className="bg-cornflower rounded-lg mx-6 px-6" onPress={onAddTestPress}>
          <View className="flex flex-row justify-between items-center h-14 ">
            <Image className="flex-none w-6 h-6" source={PlusIcon} />
            <Text className="flex-1 text-white text-center font-bold">Add Test</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-none flex justify-between items-center">
          <Image className="w-32 h-8 overflow-visible" source={Logo} />
      </View>
    </View>
  );
}
