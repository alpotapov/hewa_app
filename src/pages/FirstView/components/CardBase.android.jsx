import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    backgroundColor: '#F1F1F1',
    borderRadius: 16,
  },
});

function CardBase({ children }) {
  return (
    <View style={styles.container} className="my-2 mx-1">
      {children}
    </View>
  );
}

CardBase.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardBase;
