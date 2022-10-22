import React from 'react';
import { useNavigate } from 'react-router-native';
// eslint-disable-next-line no-unused-vars
import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';

import PageBase from '../PageBase/PageBase';
import WelcomeView from './components/WelcomeView';
import CardResultPending from './components/CardResultPending';
import walletDomain from '../../domain/wallet';

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

  if (welcomeView) {
    return (
      <PageBase footer>
        <WelcomeView onAddTest={() => navigate('/add-test')} />
      </PageBase>
    );
  }

  return (
    <PageBase footer>
      <ScrollView className="space-y-2 px-6">
        {walletEntries.map((entry) => (
          <CardResultPending entry={entry} key={entry.value} />
        ))}
      </ScrollView>
    </PageBase>
  );
}
