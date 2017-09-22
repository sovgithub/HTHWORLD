// @flow
import React from 'react';
import Landing from './screens/Landing';
import { StackNavigator } from 'react-navigation';

const App = StackNavigator({
  Landing:  { screen: Landing },
}, {
  headerMode: 'none',
});

export default App;
