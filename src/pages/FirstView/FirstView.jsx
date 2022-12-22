import React from 'react';
import { useNavigate } from 'react-router-native';
import { View, ScrollView, RefreshControl } from 'react-native';
import * as Notifications from 'expo-notifications';

import PageBase from '../PageBase/PageBase';
import PageHeader from './components/PageHeader';
import WelcomeView from './components/WelcomeView';
import CardResultPending from './components/CardResultPending';
import CardResultReceived from './components/CardResultReceived';

import Button from '../../components/Button/Button';
import useWallet from '../../hooks/wallet';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function FirstView() {
  const navigate = useNavigate();

  const { walletEntries, isLoading, refetch } = useWallet();
  const welcomeView = !isLoading && walletEntries.length === 0;

  const onAddTest = () => navigate('/add-test');

  const handleNotification = (notification) => {
    console.log(JSON.stringify(notification, null, 2));
    refetch();
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

  if (isLoading) {
    return null;
  }

  if (welcomeView) {
    return (
      <PageBase footer>
        <WelcomeView onAddTest={onAddTest} />
      </PageBase>
    );
  }

  return (
    <PageBase>
      <PageHeader />
      <Button margins="mx-2 mb-4" onPress={onAddTest} title="Add Test" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        className="flex flex-col px-2 pt-2 bg-alabaster rounded-t-3xl mb-6"
      >
        <View className="pb-6">
          {walletEntries.map((entry) => {
            if (entry.localData.status === 'Pending') {
              return <CardResultPending entry={entry} key={entry.value} />;
            }
            return <CardResultReceived entry={entry} key={entry.value} />;
          })}
        </View>
      </ScrollView>
    </PageBase>
  );
}
