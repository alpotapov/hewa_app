import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import DropShadow from 'react-native-drop-shadow';

function CardBase({ children }) {
  return (
    <View className="my-2">
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
        {children}
      </DropShadow>
    </View>
  );
}

CardBase.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardBase;
