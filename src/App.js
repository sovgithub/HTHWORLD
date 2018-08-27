import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { UrbanAirship } from 'urbanairship-react-native';
import { StyleSheet, Text, YellowBox, View } from 'react-native';

import NavigatorService from 'lib/navigator';
import configureStore from './configureStore';

import Login from 'screens/Login';
import Mnemonic from 'screens/Wallet/Mnemonic';
import Track from 'screens/Wallet/Track';
import Import from 'screens/Wallet/Import';
import Signup from 'screens/Signup';
import Menu from 'screens/Menu';
import ViewAddress from 'screens/ViewAddress';
import AddressModal from 'screens/SendRequest/AddressModal';
import QRModal from 'screens/SendRequest/QRModal';
import ContactModal from 'screens/SendRequest/ContactModal';
import CurrencyModal from 'screens/SendRequest/CurrencyModal';
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
export let navigatorRef;

const RoutingStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: navProps =>
        getNavigationOptions({
          ...navProps,
          leftAction: null,
          rightAction: null,
        }),
    },
    Signup: {
      screen: Signup,
      navigationOptions: navProps =>
        getNavigationOptions({
          ...navProps,
          leftAction: 'back',
          rightAction: null,
        }),
    },
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
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
      },
    },
    cardStyle,
    transitionConfig,
  }
);

const ModalStack = createStackNavigator(
  {
    Main: { screen: RoutingStack },
    AddressModal: {
      screen: AddressModal,
    },
    ContactModal: {
      screen: ContactModal,
    },
    CurrencyModal: {
      screen: CurrencyModal,
    },
    QRModal: {
      screen: QRModal,
    },
    ViewAddress: {
      screen: ViewAddress,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: { backgroundColor: 'transparent', shadowOpacity: 0 },
    transitionConfig: () => ({
      containerStyle: { backgroundColor: 'transparent' },
    }),
  }
);

/*
  Example usage:
  handleDeepLink('com.hoardinc.Hoard://confirm_transaction/?params={"tx":"123","uid":"12"}')
 */

function handleDeepLink(deepLink) {
  const SCHEME = 'com.hoardinc.Hoard://';
  let paths, params;

  let link = deepLink.replace(SCHEME, '');

  link = link.split('/');
  alert(`Deep Link: ${link[0]}`);

  if (link[link.length - 1].includes('?params=')) {
    params = link[link.length - 1];
    params = params.replace('?params=', '');
    alert(`Params: ${params}`);
  }

  if (link[0] === 'confirm_transaction') {
    NavigatorService.navigateDeep([
      { routeName: 'Wallet' },
      { routeName: 'Confirm', params: JSON.parse(params) },
    ]);
  } else {
    // TODO handle default or unhandled deeplinks
    NavigatorService.navigate('Dashboard');
  }
}

class App extends React.Component {
  constructor() {
    super();
    if (__DEV__) {
      YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
    }
  }

  componentDidMount() {
    SplashScreen.hide();
    this.handleNotificationsEnabled(this.props.enablePushNotifications);
  }

  refDidLoad = navigatorRef => {
    NavigatorService.setContainer(navigatorRef);

    if (!this.props.hasPreviouslyInitialized) {
      this.props.store.dispatch({ type: INIT_REQUESTING });
    }
  };

  componentWillMount() {
    UrbanAirship.getChannelId().then(channelId => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log((channelId: channelId));
      }
    });

    UrbanAirship.addListener('notificationResponse', response => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('notificationResponse:', JSON.stringify(response));
      }
    });

    UrbanAirship.addListener('pushReceived', notification => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('pushReceived:', JSON.stringify(notification));
      }
    });

    UrbanAirship.addListener('deepLink', event => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('deepLink:', JSON.stringify(event));
      }
      handleDeepLink(event.deepLink);
    });

    UrbanAirship.addListener('registration', event => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('registration:', JSON.stringify(event));
      }
    });

    UrbanAirship.addListener('notificationOptInStatus', event => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('notificationOptInStatus:', JSON.stringify(event));
      }
    });
  }

  handleNotificationsEnabled = enabled => {
    UrbanAirship.setUserNotificationsEnabled(enabled);
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('Enabled Notifications');
    }
  };

  render() {
    return (
      <LinearGradient
        start={gradients.topLeft.start}
        end={gradients.topLeft.end}
        colors={gradients.blue}
        style={styles.container}
      >
        <ModalStack ref={this.refDidLoad} />
      </LinearGradient>
    );
  }
}

App.propTypes = {
  hasPreviouslyInitialized: PropTypes.bool.isRequired,
  store: PropTypes.object.isRequired,
  enablePushNotifications: PropTypes.bool.isRequired,
};

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

// We will want the root-level app aware of user preferences, in order
// to intercept and reroute push notification action, so we need to connect()
// the app.

const mapStateToProps = state => {
  return {
    hasPreviouslyInitialized: state.app.hasPreviouslyInitialized,
    enablePushNotifications: state.settings.enablePushNotifications,
  };
};

const ConnectedApp = connect(mapStateToProps)(App);

const ProviderApp = () => (
  <Provider store={store}>
    <ConnectedApp store={store} />
  </Provider>
);

export default ProviderApp;
