// @flow
import React from 'react';
import Landing from './screens/Landing';
import Referral from './screens/Referral';
import { StackNavigator } from 'react-navigation';

const App = StackNavigator({
  Landing:  { screen: Landing },
  Referral:  { screen: Referral },
}, {
  headerMode: 'none',
});

export default App;
