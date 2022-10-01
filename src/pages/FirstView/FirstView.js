import React from 'react';
import { View, Image } from 'react-native';

import CallToAction from './components/CallToAction';

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
    console.log(`Scanned new guid: ${guid}`);
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
