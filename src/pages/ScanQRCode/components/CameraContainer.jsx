import React from 'react';
import { Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

import Button from '../../../components/Button/Button';

// eslint-disable-next-line react/prop-types
function CameraContainer({ onResult }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const resultExists = React.useRef(false);

  const onScanned = (args) => {
    const { data } = args;
    if (data) {
      resultExists.current = true;
    }
    onResult(data);
  };

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
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

export default CameraContainer;
