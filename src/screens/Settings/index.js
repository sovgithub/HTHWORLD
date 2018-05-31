import { StyleSheet, Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import DisplayCurrency from './DisplayCurrency';
import Settings from './Settings';


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
    Settings: { screen: Settings },
    DisplayCurrency: { screen: DisplayCurrency },
  },
  {
    headerMode: 'none',
    cardStyle: { backgroundColor: 'transparent' },
    transitionConfig,
  }
);

export default RoutingStack;
