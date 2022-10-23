import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import DropShadow from 'react-native-drop-shadow';
import { format } from 'date-fns';

import BloodDrop from '../assets/BloodDrop.png';

function CardResultReceived({ entry }) {
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
      <View className="flex flex-row bg-white rounded-3xl my-2 h-40">
        <View className="w-1/3 flex flex-col items-center justify-center border-r border-dusty-gray">
          <Image className="h-6" source={BloodDrop} resizeMode="contain" />
          <Text className="text-amaranth font-bold text-xl mt-2">
            {entry.localData.testType}
          </Text>
        </View>
        <View className="flex flex-col justify-around py-2 h-full w-2/3">
          <View className="flex flex-row justify-center">
            <Text className="flex-1 text-center text-amaranth text-lg font-medium">
              {format(entry.localData.dateCreated, 'dd.MM.y k:mm')}
            </Text>
          </View>
          <View className="flex flex-row justify-center pb-2">
            <View className="text-2xl pt-8 text-silver-dark">
              <Text className="amaranth text-2xl">
                {entry.remoteData.result}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </DropShadow>
  );
}

CardResultReceived.propTypes = {
  entry: PropTypes.shape({
    localData: PropTypes.shape().isRequired,
    remoteData: PropTypes.shape().isRequired,
  }).isRequired,
};

export default CardResultReceived;
