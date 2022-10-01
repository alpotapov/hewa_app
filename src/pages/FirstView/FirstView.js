import React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, View, TouchableOpacity, Image, Button } from 'react-native';

import PlusIcon from './assets/PlusIcon.png'
import Logo from './assets/Logo.png';
import Explainer from './assets/Explainer.png';

const CameraContainer = ({ onResult }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const resultExists = React.useRef(false);

  const onScanned = (args) => {
    const { data } = args;
    if (data) {
      resultExists.current = true;
    }
    onResult(data);
  }

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <BarCodeScanner
      className="flex-1 h-full w-full"
      onBarCodeScanned={resultExists.current === true ? undefined : onScanned}
      barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      type={CameraType.back}
    />
  );
  
}

const ActiveCamera = ({ onDeactivateCamera, onResult }) => {
  return (
    <View className="flex-1 space-y-6 flex flex-col justify-center">
      <View className="flex-none px-6">
        <Text className="text-lg text-cornflower">Scan QR-code on the test cartridge to receive test result.</Text>
      </View>
      <View className="flex items-center w-full h-64 px-6">
        <CameraContainer onResult={onResult} />
      </View>
      <TouchableOpacity className="bg-red-100 rounded-lg mx-6 px-6" onPress={onDeactivateCamera}>
        <View className="flex flex-row justify-between items-center h-14 ">
          <Image className="flex-none w-6 h-6" source={PlusIcon} />
          <Text className="flex-1 text-white text-center font-bold">Stop Scanning</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const ExplainerElement = ({ onActivateCamera }) => {
  return (
    <View className="flex-1 space-y-6 flex flex-col justify-center">
      <View className="flex-none px-6">
        <Text className="text-lg text-cornflower">Scan QR-code on the test cartridge to receive test result.</Text>
      </View>
      <View className="flex items-center">
        <Image className="h-64 w-64" resizeMode="contain" source={Explainer} />
      </View>
      <TouchableOpacity className="bg-cornflower rounded-lg mx-6 px-6" onPress={onActivateCamera}>
        <View className="flex flex-row justify-between items-center h-14 ">
          <Image className="flex-none w-6 h-6" source={PlusIcon} />
          <Text className="flex-1 text-white text-center font-bold">Add Test</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

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
          <ExplainerElement onActivateCamera={onActivateCamera} />
        )}
      </View>
      <View className="flex-none flex justify-between items-center mb-2">
          <Image className="w-32 h-8 overflow-visible" source={Logo} />
      </View>
    </View>
  );
}
