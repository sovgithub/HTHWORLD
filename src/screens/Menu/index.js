import React from 'react';
import { DrawerNavigator, StackNavigator, DrawerItems } from 'react-navigation';
import {
  Button,
  Dimensions,
  View,
} from 'react-native';
import Dashboard from 'screens/Dashboard';
import Wallet from 'screens/Wallet';
import Settings from 'screens/Settings';
import CoinInformation from 'screens/CoinInformation';
import withHeader from 'hocs/withHeader';
import {getColors} from 'styles';

const itemWithHeader = (title, screen) => {
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
  Settings:  {
    screen: itemWithHeader('Settings', Settings),
  },

};

const drawerNavigatorConfig = {
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
