import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NativeRouter, Navigate, Route, Routes } from 'react-router-native';

import FirstView from './src/pages/FirstView/FirstView';
import FirstFlowSuccess from './src/pages/FirstFlowSuccess/FirstFlowSuccess';
import Dashboard from './src/pages/Dashboard/Dashboard';
import Initial from './src/pages/Initial/Initial';
import Backup from './src/pages/Backup/Backup';
import CreateWallet from './src/pages/CreateWallet/CreateWallet';

export default function App() {
  return (
    <NativeRouter>
      <View className="pt-6">
        <Routes>
          <Route path="/create-wallet" element={<CreateWallet />} />
          <Route path="/backup" element={<Backup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/first-flow/success" element={<FirstFlowSuccess />} />
          <Route path="/first-flow" element={<FirstView />} />
          <Route path="/" element={<Initial />} />
        </Routes>
        <StatusBar style="auto" />
      </View>
    </NativeRouter>
  );
}
