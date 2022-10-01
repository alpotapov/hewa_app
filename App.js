import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { styled } from 'nativewind';

import FirstView from './src/pages/FirstView/FirstView';

const StyledView = styled(View);

export default function App() {
  return (
    <StyledView className="pt-6">
      <FirstView />
      <StatusBar style="auto" />
    </StyledView>
  );
}
