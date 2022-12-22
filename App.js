/* eslint-disable react/style-prop-object */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';

import FirstView from './src/pages/FirstView/FirstView';
import ScanQRCode from './src/pages/ScanQRCode/ScanQRCode';

const queryClient = new QueryClient();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const handleNotification = (notification) => {
    console.log(JSON.stringify(notification, null, 2));
  };
  const handleNotificationResponse = (response) => {
    console.log(JSON.stringify(response, null, 2));
  };

  React.useEffect(() => {
    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );
  }, []);
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
