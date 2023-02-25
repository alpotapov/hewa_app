/* eslint-disable react/prop-types */
import React from 'react';
import { Text, View, Image } from 'react-native';
import { format } from 'date-fns';

import PageBase from '../../PageBase/PageBase';

import WhiteButton from '../../../components/WhiteButton';
import CancelButton from '../../../components/CancelButton';

import AddImage from '../assets/AddImage.png';
import BloodDropWhite from '../assets/BloodDropWhite.png';

function InfoRow({ label, value }) {
  return (
    <View className="flex flex-row justify-center w-full px-4 my-3">
      <View className="w-1/4 flex flex-row justify-start items-center">
        <Text className="opacity-40 text-black">{label}</Text>
      </View>
      <View className="w-3/4 pl-8 text-3xl">{value}</View>
    </View>
  );
}

function ResultView({ entry, resetResult, saveResult }) {
  return (
    <PageBase>
      <View className="relative z-10 flex flex-row -mb-8">
        <Image className="w-52 -ml-4" source={AddImage} />
        <View className="w-36 mt-8">
          <Text className="text-3xl font-bold">
            <Text className="text-pacific-blue capitalize">Add{'\r\n'}</Text>
            Test
          </Text>
        </View>
      </View>
      <View className="bg-pacific-blue h-full rounded-t-3xl pb-8">
        <View className="h-full flex flex-col justify-center mt-10">
          <View className="">
            <InfoRow
              label="Name"
              value={
                <View className="flex flex-row">
                  <Image
                    className="h-6"
                    source={BloodDropWhite}
                    resizeMode="contain"
                  />
                  <Text className="text-white font-bold text-xl ml-2">
                    {entry.localData.testType}
                  </Text>
                </View>
              }
            />
            <InfoRow
              label="Test Date"
              value={
                <Text className="text-white text-xl">
                  {format(entry.localData.dateCreated, 'dd.MM.y HH:mm')}
                </Text>
              }
            />
            <InfoRow
              label="Test ID"
              value={<Text className="text-white text-xl">{entry.value}</Text>}
            />
            <InfoRow
              label="Status"
              value={<Text className="text-white text-xl">Pending</Text>}
            />
          </View>
          <View className="flex-grow flex flex-col justify-end mb-64">
            <WhiteButton
              margins="mx-2 mt-4"
              onPress={saveResult}
              title="Add To Health Wallet"
            />
            <CancelButton
              margins="mx-2 mt-4"
              onPress={resetResult}
              title="Cancel"
            />
          </View>
        </View>
      </View>
    </PageBase>
  );
}
export default ResultView;
