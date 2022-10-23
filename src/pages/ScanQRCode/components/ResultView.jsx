/* eslint-disable react/prop-types */
import React from 'react';
import { Text, View, Image } from 'react-native';

import PageBase from '../../PageBase/PageBase';
import Button from '../../../components/Button/Button';

import AddImage from '../assets/AddImage.png';

function ResultView({ entry, resetResult, saveResult }) {
  return (
    <PageBase>
      <View className="relative z-10 flex flex-row -mb-8">
        <Image className="w-52 -ml-4" source={AddImage} />
        <View className="w-36 mt-8">
          <Text className="text-3xl font-bold">
            <Text className="text-dull-lavender capitalize">Add{'\r\n'}</Text>
            Test
          </Text>
        </View>
      </View>
      <View className="bg-alabaster h-full rounded-t-3xl">
        <View className="flex flex-col justify-center space-y-4 mt-10">
          <View className="flex items-center w-full px-2">
            <View>
              <Text>Test Type:</Text>
              <Text>{entry.localData.testType}</Text>
            </View>
            <View>
              <Text>Unique ID:</Text>
              <Text>{entry.value}</Text>
            </View>
            <View>
              <Text>Status:</Text>
              <Text>{entry.localData.status}</Text>
            </View>
          </View>
          <Button
            margins="mx-2 mt-4"
            onPress={saveResult}
            title="Add To Health Wallet"
          />
          <Button margins="mx-2 mt-4" onPress={resetResult} title="Cancel" />
        </View>
      </View>
    </PageBase>
  );
}
export default ResultView;
