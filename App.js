import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import FirstView from './src/pages/FirstView/FirstView';

export default function App() {
  return (
    <View className="pt-6">
      <FirstView />
      <StatusBar style="auto" />
    </View>
  );
}
