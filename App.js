/* eslint-disable react/style-prop-object */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import FirstView from './src/pages/FirstView/FirstView';
import ScanQRCode from './src/pages/ScanQRCode/ScanQRCode';
// import Backup from './src/pages/Backup/Backup';
// import CreateWallet from './src/pages/CreateWallet/CreateWallet';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeRouter>
        <View className="pt-6">
          <Routes>
            {/* <Route path="/create-wallet" element={<CreateWallet />} /> */}
            {/* <Route path="/backup" element={<Backup />} /> */}
            <Route path="/add-test" element={<ScanQRCode />} />
            <Route path="/" element={<FirstView />} />
          </Routes>
          <StatusBar style="auto" />
        </View>
      </NativeRouter>
    </QueryClientProvider>
  );
}
