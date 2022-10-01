import { Text, View, TouchableOpacity, Image } from 'react-native';

import PlusIcon from '../assets/PlusIcon.png'
import Explainer from '../assets/Explainer.png';

export default function CallToAction({ onActivateCamera }) {
  return (
    <View className="flex-1 space-y-6 flex flex-col justify-center">
      <View className="flex-none px-6">
        <Text className="text-lg text-cornflower">Scan QR-code on the test cartridge to receive test result.</Text>
      </View>
      <View className="flex items-center">
        <Image className="h-64 w-64" resizeMode="contain" source={Explainer} />
      </View>
      <TouchableOpacity className="bg-cornflower rounded-lg mx-6 px-6" onPress={onActivateCamera}>
        <View className="flex flex-row justify-between items-center h-14 ">
          <Image className="flex-none w-6 h-6" source={PlusIcon} />
          <Text className="flex-1 text-white text-center font-bold">Add Test</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}