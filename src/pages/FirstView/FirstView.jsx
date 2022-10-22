import React from 'react';
import { useNavigate } from 'react-router-native';
// eslint-disable-next-line no-unused-vars
import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';

import PageBase from '../PageBase/PageBase';
import WelcomeView from './components/WelcomeView';
import CardResultPending from './components/CardResultPending';
import walletDomain from '../../domain/wallet';

import MedicalRecord from './assets/MedicalRecord.png';
import Button from '../../components/Button/Button';

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
  const [walletEntries, setWalletEntries] = React.useState([]);
  const welcomeView = walletEntries.length === 0;

  React.useEffect(() => {
    // walletDomain.clear()
    walletDomain.readAll().then((entries) => {
      setWalletEntries(entries);
    });
  }, []);

  const onAddTest = () => navigate('/add-test');

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
      <ScrollView className="flex flex-col px-2 pt-2 bg-alabaster h-full rounded-t-3xl">
        {walletEntries.map((entry) => (
          <CardResultPending entry={entry} key={entry.value} />
        ))}
      </ScrollView>
    </PageBase>
  );
}
