// this shim must be loaded before bip39 or the bitcoin lib,
// to correctly initialize the "process" global variable that
// is expected to be available by their dependencies
import 'react-native-process-shim';

import { AppRegistry } from 'react-native';
import App from './App';
AppRegistry.registerComponent('HTHWorld', () => App);
