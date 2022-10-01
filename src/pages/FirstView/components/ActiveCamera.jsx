import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

import PlusIcon from '../assets/PlusIcon.png'

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

export default ActiveCamera;
