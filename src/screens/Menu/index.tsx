import * as React from 'react';
import { DrawerNavigator, StackNavigator, DrawerItems, DrawerNavigatorConfig } from 'react-navigation';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  View,
} from 'react-native';
import Referral from 'screens/Referral';
import Dashboard from 'screens/Dashboard';
import Wallet from 'screens/Wallet';
import CoinInformation from 'screens/CoinInformation';
import withHeader, {WrappedComponentType} from 'hocs/withHeader';
import {getColors} from 'styles';

const itemWithHeader = (title: string, screen: WrappedComponentType) => {
  return StackNavigator({Main: { screen: withHeader(title, screen) }});
};

const RouteConfigs = {
  Wallet:  {
    screen: StackNavigator({
      Main: { screen: withHeader('Wallet', Wallet) },
      CoinInformation: { screen: CoinInformation }
    })
  },
  Dashboard:  {
    screen: itemWithHeader('Dashboard', Dashboard),
  },
  Referral:  {
    screen: itemWithHeader('Referral', Referral),
  },
};

const drawerNavigatorConfig: DrawerNavigatorConfig = {
  drawerPosition: 'right',
  drawerWidth: Dimensions.get('window').width,
  contentComponent: props => (
    <View style={{backgroundColor: getColors().background, flex: 1}}>
      <View style={{marginTop: 30, alignSelf: 'flex-end'}}>
        <Button
          title="X"
          onPress={() => props.navigation.navigate('DrawerClose')}
          color={getColors().menu}
        />
      </View>
      <DrawerItems
        {...props}
      />
    </View>
  )
};

export default DrawerNavigator(RouteConfigs, drawerNavigatorConfig)
