import React from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import NavigatorService from 'lib/navigator';
import configureStore from './configureStore';
import { StyleSheet, Animated, Easing } from 'react-native';

/* import HockeyApp from 'react-native-hockeyapp';*/
// import Config from 'react-native-config';
import Login from 'screens/Login';
import Mnemonic from 'screens/Wallet/Mnemonic';
import Track from 'screens/Wallet/Track';
import Import from 'screens/Wallet/Import';
import Signup from 'screens/Signup';
import Menu from 'screens/Menu';
import { createStackNavigator } from 'react-navigation';
import { INIT_REQUESTING } from './containers/App/constants';
import { gradients } from 'styles';
import LinearGradient from 'react-native-linear-gradient';

import {
  cardStyle,
  transitionConfig,
  getNavigationOptions,
} from 'components/Base/Navigation';

export const store = configureStore();

const RoutingStack = createStackNavigator(
  {
    Login: { screen: Login, navigationOptions: { header: null } },
    Signup: { screen: Signup, navigationOptions: { header: null } },
    Menu: { screen: Menu, navigationOptions: { header: null } },
    Mnemonic: {
      screen: Mnemonic,
      navigationOptions: navProps =>
        getNavigationOptions({
          ...navProps,
          leftAction: false,
          rightAction: false,
        }),
    },
    Track: {
      screen: Track,
      navigationOptions: navProps =>
        getNavigationOptions({
          ...navProps,
        }),
    },
    Import: {
      screen: Import,
      navigationOptions: navProps =>
        getNavigationOptions({
          ...navProps,
        }),
    },
  },
  {
    headerMode: 'float',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'transparent'
      }
    },
    cardStyle,
    transitionConfig,
  }
);

export let navigatorRef;

export default class App extends React.Component {
  componentWillMount() {
    /* HockeyApp.configure(Config.HOCKEYAPP_API_KEY, true);*/
  }

  componentDidMount() {
    /* HockeyApp.start();*/
    /* HockeyApp.checkForUpdate();*/
    SplashScreen.hide();
  }

  refDidLoad = navigatorRef => {
    NavigatorService.setContainer(navigatorRef);

    if (!store.getState().app.hasPreviouslyInitialized) {
      store.dispatch({ type: INIT_REQUESTING });
    }
  };

  render() {
    return (
      <Provider store={store}>
        <LinearGradient
          start={gradients.topLeft.start}
          end={gradients.topLeft.end}
          colors={gradients.blue}
          style={styles.container}
        >
          <RoutingStack ref={this.refDidLoad} />
        </LinearGradient>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
