import React from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import NavigatorService from 'lib/navigator';
import configureStore from './configureStore';
import { StyleSheet, YellowBox } from 'react-native';

/* import HockeyApp from 'react-native-hockeyapp';*/
// import Config from 'react-native-config';
import Login from 'screens/Login';
import Mnemonic from 'screens/Wallet/Mnemonic';
import Track from 'screens/Wallet/Track';
import Import from 'screens/Wallet/Import';
import Signup from 'screens/Signup';
import Forgot from 'screens/Forgot';
import ForgotModal from 'screens/Forgot/ForgotModal';
import Menu from 'screens/Menu';
import ViewAddress from 'screens/ViewAddress';
import AddressModal from 'screens/SendRequest/AddressModal';
import QRModal from 'screens/SendRequest/QRModal';
import ContactModal from 'screens/SendRequest/ContactModal';
import CurrencyModal from 'screens/SendRequest/CurrencyModal';
import Notifications from 'containers/Notifications';
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
    Forgot: {
      screen: Forgot,
      navigationOptions: navProps =>
        getNavigationOptions({
          ...navProps,
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
    ForgotModal: {
      screen: ForgotModal,
    },
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

export default class App extends React.Component {
  constructor() {
    super();
    if (__DEV__) {
      YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
    }
  }

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
          <Notifications>
            <ModalStack ref={this.refDidLoad} />
          </Notifications>
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
