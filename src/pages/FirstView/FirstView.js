import React from 'react';
import { View, Image } from 'react-native';

import firstFlowDomain from '../../domain/firstFlow';
import CallToAction from './components/CallToAction';
import ActiveCamera from './components/ActiveCamera';

import Logo from './assets/Logo.png';


export default function FirstView() {
  const [cameraActive, setCameraActive] = React.useState(false);
  const onActivateCamera = () => {
    setCameraActive(true);
  }
  const onDeactivateCamera = () => {
    setCameraActive(false);
  }

  const onResult = (guid) => {
    firstFlowDomain.handleGuidInput(guid).then((output) => {
      if (output === 0) {
        alert('Redirecting to FirstFlowSuccess page');
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
