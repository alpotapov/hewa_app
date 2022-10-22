import React from 'react';
// eslint-disable-next-line no-unused-vars
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import DropShadow from 'react-native-drop-shadow';
import { format } from 'date-fns';

import BloodDropGray from '../assets/BloodDropGray.png';
import Clock from '../assets/Clock.png';

function CardResultPending({ entry }) {
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
      <View className="flex flex-row bg-seashell rounded-3xl my-2 h-40">
        <View className="w-1/3 flex flex-col items-center justify-center border-r border-dusty-gray">
          <Image className="h-6" source={BloodDropGray} resizeMode="contain" />
          <Text className="text-dusty-gray font-bold text-xl mt-2">
            {entry.localData.testType}
          </Text>
        </View>
        <View className="flex flex-col justify-around py-2 h-full w-2/3">
          <View className="flex flex-row justify-center">
            <Text className="flex-1 text-center text-dusty-gray text-lg font-medium">
              {format(entry.localData.dateCreated, 'dd.MM.y k:mm')}
            </Text>
          </View>
          <View className="flex flex-row justify-center pb-2">
            <Image
              source={Clock}
              style={[
                {
                  width: 75,
                  height: 75,
                  marginTop: 10,
                  marginLeft: -40,
                  marginRight: -22,
                },
              ]}
            />
            <View className="text-2xl pt-8 text-silver-dark">
              <Text className="text-dusty-gray text-2xl">
                {entry.localData.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </DropShadow>
  );
}

CardResultPending.propTypes = {
  entry: PropTypes.shape({
    localData: PropTypes.shape().isRequired,
  }).isRequired,
};

export default CardResultPending;
