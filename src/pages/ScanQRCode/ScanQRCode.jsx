import React from 'react';
import { Text, View, Image } from 'react-native';
import { useNavigate } from 'react-router-native';

import walletDomain from '../../domain/wallet';

import PageBase from '../PageBase/PageBase';
import CameraContainer from './components/CameraContainer';
import Button from '../../components/Button/Button';

import AddImage from './assets/AddImage.png';

function ScanQRCode() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [cameraActive, setCameraActive] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const onActivateCamera = () => {
    setCameraActive(true);
  };
  const onDeactivateCamera = () => {
    setCameraActive(false);
  };
  const onResult = (guid) => {
    walletDomain.handleInput(guid).then((output) => {
      if (output === 0) {
        navigate('/');
      } else if (output === 1) {
        // eslint-disable-next-line no-undef
        alert('This test is already in your HealthWallet');
      } else {
        // eslint-disable-next-line no-undef
        alert(`An error occured. Code ${output}`);
      }
    });
    onDeactivateCamera();
  };
  return (
    <PageBase footer>
      <View className="relative z-10 flex flex-row -mb-8">
        <Image className="w-52 -ml-4" source={AddImage} />
        <View className="w-36 mt-8">
          <Text className="text-3xl font-bold">
            <Text className="text-dull-lavender">Scan{'\r\n'}</Text>QR Code
          </Text>
        </View>
      </View>
      <View className="bg-alabaster h-full rounded-t-3xl">
        <View className="flex flex-col justify-center space-y-4 mt-10">
          <View className="flex items-center w-full h-64 px-2">
            <CameraContainer onResult={onResult} />
          </View>
          <Button
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
