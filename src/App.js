import React from 'react';
import { Provider } from 'react-redux';
import NavigatorService from './navigator';
import configureStore from './configureStore';
import HockeyApp from 'react-native-hockeyapp';
import Login from 'screens/Login';
import Mnemonic from 'screens/Wallet/Mnemonic';
import Recover from 'screens/Wallet/Recover';
import Signup from 'screens/Signup';
import Menu from 'screens/Menu';
import { StackNavigator } from 'react-navigation';

const store = configureStore();

const RoutingStack = StackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    Menu: { screen: Menu },
    Mnemonic: { screen: Mnemonic },
    Recover: { screen: Recover }
  },
  {
    headerMode: 'none'
  }
);

export let navigatorRef;

export default class App extends React.Component {
  componentWillMount() {
    HockeyApp.configure('HOCKEYAPP_API_KEY', true);
  }

  componentDidMount() {
    HockeyApp.start();
    HockeyApp.checkForUpdate();
  }

  render() {
    return (
      <Provider store={store}>
        <RoutingStack
          ref={navigatorRef => {
            NavigatorService.setContainer(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
