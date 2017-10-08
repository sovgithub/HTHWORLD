import React from 'react';
import { DrawerNavigator, StackNavigator, DrawerItems } from 'react-navigation';
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
import withHeader from 'hocs/withHeader';

const itemWithHeader = (title, screen) => {
  return StackNavigator({Main: { screen: withHeader(title, screen) }});
};

const RouteConfigs = {
  Dashboard:  {
    screen: itemWithHeader('Dashboard', Dashboard),
  },
  Referral:  {
    screen: itemWithHeader('Referral', Referral),
  },
};

const DrawerNavigatorConfig = {
  drawerPosition: 'right',
  drawerWidth: Dimensions.get('window').width,
  contentComponent: props => <View style={{marginTop: 30}}>
    <View style={{alignSelf: 'flex-end'}}>
      <Button title="X" onPress={() => props.navigation.navigate('DrawerClose')} />
    </View>
    <DrawerItems {...props} />
  </View>
};

export default DrawerNavigator(RouteConfigs, DrawerNavigatorConfig)
