import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigate } from 'react-router-native';

import guidScanningDomain from '../../domain/guidScanning';
import CallToAction from './components/CallToAction';
import ActiveCamera from './components/ActiveCamera';

import Logo from './assets/Logo.png';


export default function FirstView() {
  const navigate = useNavigate();
  const [cameraActive, setCameraActive] = React.useState(false);
  const onActivateCamera = () => {
    setCameraActive(true);
  }
  const onDeactivateCamera = () => {
    setCameraActive(false);
  }

  const onResult = (guid) => {
    guidScanningDomain.handleInput(guid).then((output) => {
      if (output === 0) {
        navigate('/first-flow/success');
      } else if (output === 1) {
        alert('This test is already in your HealthWallet')
      } else {
        alert(`An error occured. Code ${output}`);
      }
    });
    onDeactivateCamera();
  }

  return (
    <View className="h-full">
      <View className="flex-none flex flex-row justify-end items-center">
        <TouchableOpacity className="flex-none h-10 px-6 mt-2 w-1/2 flex flex-row justify-end items-center" onPress={() => {}}>
          <Text className="flex-shrink text-cornflower">Return to Dashboard</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        {cameraActive ? (
          <ActiveCamera onResult={onResult} onDeactivateCamera={onDeactivateCamera} />
        ) : (
          <CallToAction onActivateCamera={onActivateCamera} />
        )}
      </View>
      <View className="flex-none flex justify-between items-center mb-2">
          <Image className="w-32 h-8 overflow-visible" source={Logo} />
      </View>
    </View>
  );
}
