import { createStackNavigator } from 'react-navigation';
import {
  cardStyle,
  transitionConfig,
  getNavigationOptions,
} from 'components/Base/Navigation';

import GetHelp from './GetHelp';
import CreateSupportTicket from './CreateSupportTicket';

const RoutingStack = createStackNavigator(
  {
    GetHelp: {
      screen: GetHelp,
      navigationOptions: navProps =>
        getNavigationOptions({
          ...navProps,
          leftAction: false,
          title: 'Get Help',
        }),
    },
    CreateSupportTicket: {
      screen: CreateSupportTicket,
      navigationOptions: navProps =>
        getNavigationOptions({
          ...navProps,
          title: 'Submit A Request',
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
