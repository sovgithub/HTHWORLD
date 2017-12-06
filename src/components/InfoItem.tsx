import * as React from 'react';
import { View, Text } from 'react-native';

interface Props {
  label: string;
  value: string;
}

const InfoItem: React.SFC<Props> = ({label, value}) => (
  <View style={{flexDirection: 'row'}}>
    <Text>{label}</Text>
    <Text>{value}</Text>
  </View>
);

export default InfoItem;
