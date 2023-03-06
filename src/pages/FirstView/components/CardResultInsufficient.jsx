import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import DropShadow from 'react-native-drop-shadow';
import { format } from 'date-fns';

import OrangeButton from '../../../components/OrangeButton';

import BloodDrop from '../assets/BloodDrop.png';
import Warning from '../assets/Warning.png';

function CardResultInsufficient({ entry }) {
  return (
    <DropShadow
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      }}
    >
      <View className="flex flex-col bg-white rounded-3xl my-2 h-60">
        <View className="flex flex-row bg-white rounded-3xl h-40">
          <View className="w-1/3 flex flex-col items-center justify-center border-r border-dusty-gray">
            <Image className="h-6" source={BloodDrop} resizeMode="contain" />
            <Text className="text-amaranth font-bold text-xl mt-2">
              {entry.localData.testType}
            </Text>
          </View>
          <View className="flex flex-col justify-around py-2 h-full w-2/3">
            <View className="flex flex-row justify-center">
              <Text className="flex-1 text-center text-amaranth text-lg font-medium">
                {format(entry.localData.dateCreated, 'dd.MM.y HH:mm')}
              </Text>
            </View>
            <View className="flex-1 flex flex-row justify-center items-center">
              <Text className="text-center">
                <Text className="text-4xl font-bold">
                  {entry.remoteData.value}
                </Text>
                <Text className="text-2xl"> {entry.remoteData.unit}</Text>
              </Text>
            </View>
            <View className="flex flex-row justify-center items-center">
              <Image className="h-6" source={Warning} resizeMode="contain" />
              <Text className="ml-2 ">Insufficient</Text>
            </View>
          </View>
        </View>
        <View className="border-t border-dusty-gray h-20 flex flex-row px-2 py-2">
          <View className="w-1/2 pr-1">
            <OrangeButton title="Schedule doctor's appointment" />
          </View>
          <View className="w-1/2 pl-1">
            <OrangeButton title={'Order\nsupplements'} innerWhite />
          </View>
        </View>
      </View>
    </DropShadow>
  );
}

CardResultInsufficient.propTypes = {
  entry: PropTypes.shape({
    localData: PropTypes.shape().isRequired,
    remoteData: PropTypes.shape().isRequired,
  }).isRequired,
};

export default CardResultInsufficient;
