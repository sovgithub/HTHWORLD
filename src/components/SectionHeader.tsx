import * as React from 'react';
import { View, Text } from 'react-native';

interface Props {
  children: string;
}

const SectionHeader: React.SFC<Props> = ({children}) => (
  <View>
    <Text>{children}</Text>
    <View style={{flexDirection: 'row'}}>
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

export default SectionHeader;
