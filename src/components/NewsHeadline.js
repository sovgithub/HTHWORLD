import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const NewsHeadline = ({
  date,
  source,
  title,
}) => (
  <View style={{flexDirection: 'row'}}>
    <View>
      <Text>{title}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text>{source}</Text>
        <Text>-</Text>
        <Text>{date}</Text>
      </View>
    </View>
    <View>
      <Text>&gt;</Text>
    </View>
  </View>
);

NewsHeadline.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default NewsHeadline;
