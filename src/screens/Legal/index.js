import { createStackNavigator } from 'react-navigation';

import {
  cardStyle,
  transitionConfig,
  getNavigationOptions,
} from 'components/Base/Navigation';

import Legal from './Legal';
import UserAgreement from './UserAgreement';
import Privacy from './Privacy';
import Compliance from './Compliance';

const RoutingStack = createStackNavigator(
  {
    Legal: {
      screen: Legal,
      navigationOptions: navProps =>
        getNavigationOptions({
          ...navProps,
          leftAction: false,
          title: 'Legal',
        }),
    },
    UserAgreement: {
      screen: UserAgreement,
      navigationOptions: navProps =>
        getNavigationOptions({
          ...navProps,
          title: 'Legal',
        }),
    },
    Privacy: {
      screen: Privacy,
      navigationOptions: navProps =>
        getNavigationOptions({
          ...navProps,
          title: 'Legal',
        }),
    },
    Compliance: {
      screen: Compliance,
      navigationOptions: navProps =>
        getNavigationOptions({
          ...navProps,
          title: 'Legal',
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
