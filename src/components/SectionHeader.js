import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const SectionHeader = ({ children }) => (
  <View>
    <Text>{children}</Text>
    <View style={{ flexDirection: 'row' }}>
      <View
        style={{
          height: 2,
          backgroundColor: 'green',
          width: 50,
        }}
      />
      <View
        style={{
          height: 2,
          backgroundColor: 'grey',
          flex: 1,
        }}
      />
    </View>
  </View>
);

SectionHeader.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SectionHeader;
