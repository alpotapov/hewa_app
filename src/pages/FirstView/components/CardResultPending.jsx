import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import DropShadow from 'react-native-drop-shadow';

// import IconGray from '../assets/IconGray.svg';

function CardResultPending({ entry }) {
  return (
    <DropShadow
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
      }}
    >
      <View className="flex flex-row bg-seashell rounded-3xl">
        <View className="flex flex-col items-center justify-center pr-5 pt-5 pb-3.5 border-r border-silver">
          {/* <Image source={IconGray} alt="paramTest.icon" /> */}
          <View className="text-dark-gray font-bold text-xl pt-3.5">
            <Text>{entry.localData.testType}</Text>
          </View>
        </View>
        <View className="flex flex-col items-center mx-auto pt-5 pb-3.5 pl-3">
          <View className="text-dark-gray font-medium">
            <Text>{entry.localData.dateCreated}</Text>
          </View>
          <View className="text-2xl pt-8 text-silver-dark">
            <Text>{entry.localData.status}</Text>
          </View>
        </View>
      </View>
    </DropShadow>
  );
}

// CardResultPending.propTypes = {
//   entry: PropTypes.shape().isRequired,
// };

export default CardResultPending;
