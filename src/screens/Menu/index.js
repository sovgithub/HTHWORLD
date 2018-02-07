import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import ReceiveModal from 'containers/ReceiveModal';
import SendModal from 'containers/SendModal';
import Navigator from './Navigator.js';

export default class RootMenuView extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  static router = Navigator.router

  render() {
    return (
      <View style={styles.container}>
        <Navigator navigation={this.props.navigation} />
        <ReceiveModal />
        <SendModal />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
