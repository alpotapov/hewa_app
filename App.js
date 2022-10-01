import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function App() {
  return (
    <StyledView className="flex items-center justify-center pt-6">
      <StyledText className="font-bold text-xl">HealthWallet</StyledText>
      <StatusBar style="auto" />
    </StyledView>
  );
}
