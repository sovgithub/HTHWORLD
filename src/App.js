import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from './store.duck';
import HockeyApp from 'react-native-hockeyapp';
import Landing from 'screens/Landing';
import Menu from 'screens/Menu';
import { StackNavigator } from 'react-navigation';

const storeInstance = createStore(store);

const RoutingStack = StackNavigator({
  Landing:  { screen: Landing },
  Menu: { screen: Menu },
}, {
  headerMode: 'none',
});



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
      <Provider store={storeInstance}>
        <RoutingStack />
      </Provider>
    );
  }
}
