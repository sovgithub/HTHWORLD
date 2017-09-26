// @flow
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from './store.duck';
import Landing from 'screens/Landing';
import Referral from 'screens/Referral';
import { StackNavigator } from 'react-navigation';

const storeInstance = createStore(store);

const RoutingStack = StackNavigator({
  Landing:  { screen: Landing },
  Referral:  { screen: Referral },
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
