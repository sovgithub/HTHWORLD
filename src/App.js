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

export const store = configureStore();

const transitionConfig = () => {
  return {
    containerStyle: { backgroundColor: 'transparent' },
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      });

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [0, 1],
      });

      return { opacity: opacity, transform: [{ translateX: translateX }] };
    },
  };
};

const RoutingStack = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    Menu: { screen: Menu },
    Mnemonic: { screen: Mnemonic },
    Track: { screen: Track },
    Import: { screen: Import },
  },
  {
    headerMode: 'none',
    cardStyle: { backgroundColor: 'transparent' },
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
    store.dispatch({ type: INIT_REQUESTING });
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <LinearGradient
          start={gradients.topLeft.start}
          end={gradients.topLeft.end}
          colors={gradients.blue}
          style={styles.container}
        >
          <RoutingStack
            ref={navigatorRef => {
              NavigatorService.setContainer(navigatorRef);
            }}
          />
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
