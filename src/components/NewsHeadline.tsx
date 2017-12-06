import * as React from 'react';
import { View, Text } from 'react-native';

interface Props {
  title: string;
  source: string;
  date: string;
  url: string;
}

const NewsHeadline: React.SFC<Props> = ({
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
      <Text>></Text>
    </View>
  </View>
);

export default NewsHeadline;
