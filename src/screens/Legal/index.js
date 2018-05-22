import { StyleSheet, Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Legal from './Legal';
import UserAgreement from './UserAgreement';
import Privacy from './Privacy';
import Compliance from './Compliance';


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
    Legal: { screen: Legal },
    UserAgreement: { screen: UserAgreement },
    Privacy: { screen: Privacy },
    Compliance: { screen: Compliance },
  },
  {
    headerMode: 'none',
    cardStyle: { backgroundColor: 'transparent' },
    transitionConfig,
  }
);

export default RoutingStack;
