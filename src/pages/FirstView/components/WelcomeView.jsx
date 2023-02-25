import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import PlusIcon from '../assets/PlusIcon.png';
import MedicalRecordImage from '../assets/MedicalRecord.png';

const styles = StyleSheet.create({
  medicalRecord: {
    width: 246,
    height: 276,
  },
});

export default function WelcomeView({ onAddTest }) {
  return (
    <View className="flex-1 w-full px-6 py-6">
      <View className="">
        <View className="relative -mb-10 ml-12">
          <Image source={MedicalRecordImage} style={styles.medicalRecord} />
        </View>
        <View className="w-46 mb-8">
          <Text className="text-5xl font-bold text-amaranth">
            Your{'\r\n'}Test{'\r\n'}
            <Text className="text-black">Results</Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="bg-pacific-blue rounded-2xl px-6"
        onPress={onAddTest}
      >
        <View className="flex flex-row justify-between items-center h-14">
          <Image className="flex-none w-6 h-6" source={PlusIcon} />
          <Text className="flex-1 text-white text-center font-bold">
            Add Test
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

WelcomeView.propTypes = {
  onAddTest: PropTypes.func.isRequired,
};
