import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Dimensions, Animated, Easing } from 'react-native';
import Wallet from 'screens/Wallet';
import KYC from 'screens/KYC';
import Settings from 'screens/Settings';
import About from 'screens/About';
import GetHelp from 'screens/GetHelp';
import Legal from 'screens/Legal';
import CoinInformation from 'screens/CoinInformation';
import Authenticate from 'components/Authenticate';
import Store from 'components/Pin/Store';
import withHeader from 'hocs/withHeader';
import Menu from './Menu';

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

      return { opacity: opacity, transform: [{ translateX }] };
    },
  };
};

const itemWithHeader = (title, screen) => {
  return createStackNavigator(
    {
      Main: {
        screen: withHeader(title, screen),
      },
    },
    {
      cardStyle: { backgroundColor: 'transparent' },
      transitionConfig,
    }
  );
};

const RouteConfigs = {
  Wallet: {
    screen: createStackNavigator({
      Main: {
        screen: Wallet,
        navigationOptions: {
          header: null
        }
      },
      CoinInformation: {
        screen: CoinInformation,
        navigationOptions: {
          header: null
        }
      },
    }, {
      cardStyle: {backgroundColor: 'transparent'},
      transitionConfig
    }),
  },
  Settings: {
    screen: Settings,
  },
  KYC: {
    screen: KYC,
  },
  Authenticate: {
    screen: Authenticate,
  },
  Store: {
    screen: Store,
  },
  Legal: {
    screen: Legal,
  },
  About: {
    screen: About,
  },
  GetHelp: {
    screen: GetHelp,
  },
};

const drawerNavigatorConfig = {
  drawerPosition: 'right',
  drawerWidth: Dimensions.get('window').width - 100,
  contentComponent: Menu,
};

export default createDrawerNavigator(RouteConfigs, drawerNavigatorConfig);
