import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NativeRouter, Navigate, Route, Routes } from 'react-router-native';

import FirstView from './src/pages/FirstView/FirstView';
import FirstFlowSuccess from './src/pages/FirstFlowSuccess/FirstFlowSuccess';
import Dashboard from './src/pages/Dashboard/Dashboard';

export default function App() {
  return (
    <NativeRouter>
      <View className="pt-6">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/first-flow/success" element={<FirstFlowSuccess />} />
          <Route path="/first-flow" element={<FirstView />} />
          <Route path="/" element={<Navigate to="/first-flow" />} />
        </Routes>
        <StatusBar style="auto" />
      </View>
    </NativeRouter>
  );
}
