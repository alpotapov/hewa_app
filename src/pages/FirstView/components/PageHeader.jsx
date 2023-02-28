import React from 'react';
import { View, Image, Text } from 'react-native';

import MedicalRecord from '../assets/MedicalRecord.png';

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
          <Text className="text-sunset-orange">
            Your{'\r\n'}Test{'\r\n'}
          </Text>
          Results
        </Text>
      </View>
    </View>
  );
}

export default PageHeader;
