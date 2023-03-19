/* eslint-disable react/style-prop-object */
import './sentry';
import * as Sentry from '@sentry/react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import FirstView from './src/pages/FirstView/FirstView';
import ScanQRCode from './src/pages/ScanQRCode/ScanQRCode';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeRouter>
        <View className="pt-6">
          <Routes>
            <Route path="/add-test" element={<ScanQRCode />} />
            <Route path="/" element={<FirstView />} />
          </Routes>
          <StatusBar style="auto" />
        </View>
      </NativeRouter>
    </QueryClientProvider>
  );
}

export default Sentry.wrap(App);
