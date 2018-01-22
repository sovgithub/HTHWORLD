import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';


const InfoItem = ({label, value}) => (
  <View style={{flexDirection: 'row'}}>
    <Text>{label}</Text>
    <Text>{value}</Text>
  </View>
);

InfoItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

export default InfoItem;
