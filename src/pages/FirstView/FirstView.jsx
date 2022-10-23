import React from 'react';
import { useNavigate } from 'react-router-native';
// eslint-disable-next-line no-unused-vars
import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';

import PageBase from '../PageBase/PageBase';
import WelcomeView from './components/WelcomeView';
import CardResultPending from './components/CardResultPending';

import MedicalRecord from './assets/MedicalRecord.png';
import Button from '../../components/Button/Button';
import useWallet from '../../hooks/wallet';

// eslint-disable-next-line react/prop-types
function PageHeader() {
  return (
    <View className="relative z-10 flex flex-row">
      <Image
        className="h-36 w-36"
        resizeMode="contain"
        source={MedicalRecord}
      />
      <View className="mt-4">
        <Text className="text-5xl font-bold">
          <Text className="text-dull-lavender">Test{'\r\n'}</Text>Results
        </Text>
      </View>
    </View>
  );
}

export default function FirstView() {
  const navigate = useNavigate();

  const { walletEntries, isLoading } = useWallet();
  const welcomeView = !isLoading && walletEntries.length === 0;

  const onAddTest = () => navigate('/add-test');

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
      <ScrollView className="flex flex-col px-2 pt-2 bg-alabaster rounded-t-3xl mb-6">
        <View className="pb-6">
          {walletEntries.map((entry) => (
            <CardResultPending entry={entry} key={entry.value} />
          ))}
        </View>
      </ScrollView>
    </PageBase>
  );
}
