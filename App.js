// @flow
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from './store.duck';
import Landing from 'screens/Landing';
import Menu from 'screens/Menu';
// $FlowFixMe - until 1.0.0-beta.13 version of react-navigation
import { StackNavigator } from 'react-navigation';

const storeInstance = createStore(store);

const RoutingStack = StackNavigator({
  Landing:  { screen: Landing },
  Menu: { screen: Menu },
}, {
  headerMode: 'none',
});


export default function App() {
  return (
    <Provider store={storeInstance}>
      <RoutingStack />
    </Provider>
  );
};
