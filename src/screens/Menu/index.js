import React from 'react';
import PropTypes from 'prop-types';
import { DrawerNavigator, StackNavigator, DrawerItems, DrawerNavigatorConfig } from 'react-navigation';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  View,
} from 'react-native';
import Dashboard from 'screens/Dashboard';
import Wallet from 'screens/Wallet';
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
