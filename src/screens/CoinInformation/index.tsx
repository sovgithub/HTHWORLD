import * as React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import {
  NavigationAction,
  NavigationScreenProp,
  NavigationScreenConfigProps,
  NavigationStackScreenOptions,
  NavigationLeafRoute
} from 'react-navigation';
import {getColors} from 'styles';
import IntervalSelectionChart from 'components/IntervalSelectionChart';
import ValueStatement from 'components/ValueStatement';


interface Props {
  navigation: NavigationScreenProp<
    NavigationLeafRoute<{
      coin: string;
    }>,
    NavigationAction
  >
}

interface State {}

export default class CoinInformation extends React.Component <Props, State> {
  static navigationOptions: (opts: NavigationScreenConfigProps) => NavigationStackScreenOptions = ({navigation}) => ({
    headerTitle: navigation.state.params.coin
  })

  render() {
    const coin = this.props.navigation.state.params.coin;
    return (
      <View style={{flex: 1}}>
        <View>
          <ValueStatement
            title={`${coin} Price`}
            value="xxxxx"
            change="x%"
            positive={true}
          />
          <ValueStatement
            title={`${coin} Balance`}
            value="xxxxx"
            change="x%"
            positive={true}
          />
        </View>
        <IntervalSelectionChart currency={coin} />
      </View>
    );
  }
}
