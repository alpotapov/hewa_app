import React from 'react';
import { Text, View, Image } from 'react-native';
import { useNavigate } from 'react-router-native';

import useQrCode from '../../hooks/qrCode';

import PageBase from '../PageBase/PageBase';
import CameraContainer from './components/CameraContainer';
import ResultView from './components/ResultView';
import CancelButton from '../../components/CancelButton';

import AddImage from './assets/AddImage.png';

function ScanQRCode() {
  const navigate = useNavigate();
  const { onResult, parsedEntry, resetResult, saveResult } = useQrCode();

  const onAfterSave = () => {
    navigate('/');
  };

  if (parsedEntry) {
    return (
      <ResultView
        entry={parsedEntry}
        resetResult={resetResult}
        saveResult={() => saveResult(onAfterSave)}
      />
    );
  }

  return (
    <PageBase footer>
      <View className="relative z-10 flex flex-row -mb-8">
        <Image className="w-52 -ml-4" source={AddImage} />
        <View className="w-36 mt-8">
          <Text className="text-3xl font-bold">
            <Text className="text-pacific-blue">Scan{'\r\n'}</Text>QR Code
          </Text>
        </View>
      </View>
      <View className="bg-alabaster h-full rounded-t-3xl">
        <View className="flex flex-col justify-center space-y-4 mt-10 p-6">
          <View className="flex items-center w-full h-64 px-2">
            <CameraContainer onResult={onResult} />
          </View>
          <CancelButton
            margins="mx-2 mt-4"
            onPress={() => navigate('/')}
            title="Stop Scanning"
          />
        </View>
      </View>
    </PageBase>
  );
}

export default ScanQRCode;
