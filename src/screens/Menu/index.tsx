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
import withHeader, {WrappedComponentType} from 'hocs/withHeader';

const itemWithHeader = (title: string, screen: WrappedComponentType) => {
  return StackNavigator({Main: { screen: withHeader(title, screen) }});
};

const RouteConfigs = {
  Wallet:  {
    screen: itemWithHeader('Wallet', Wallet),
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
  contentComponent: props => <View style={{marginTop: 30}}>
    <View style={{alignSelf: 'flex-end'}}>
      <Button title="X" onPress={() => props.navigation.navigate('DrawerClose')} />
    </View>
    <DrawerItems {...props} />
  </View>
};

export default DrawerNavigator(RouteConfigs, drawerNavigatorConfig)
