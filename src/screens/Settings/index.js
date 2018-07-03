import { createStackNavigator } from 'react-navigation';

import {
  cardStyle,
  transitionConfig,
  getNavigationOptions,
} from 'components/Base/Navigation';

import DisplayCurrency from './DisplayCurrency';
import Settings from './Settings';

const RoutingStack = createStackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: navProps =>
        getNavigationOptions({
          ...navProps,
          leftAction: false,
          title: 'Settings',
        }),
    },
    DisplayCurrency: {
      screen: DisplayCurrency,
      navigationOptions: navProps =>
        getNavigationOptions({
          ...navProps,
          title: null,
        }),
    },
  },
  {
    headerMode: 'float',
    cardStyle,
    transitionConfig,
  }
);

export default RoutingStack;
