import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import Scene from 'components/Scene';
import T from 'components/Typography';
import {
  TRANSACTION_PENDING,
  TRANSACTION_SUCCESS,
  TRANSACTION_ERROR,
} from './constants';
import NavigatorService from 'lib/navigator';
import { Try } from 'components/Conditional';
import Button from 'components/Button';

export default class TransactionStatus extends Component {
  static propTypes = {
    transaction: PropTypes.oneOf([
      TRANSACTION_PENDING,
      TRANSACTION_SUCCESS,
      TRANSACTION_ERROR,
    ]).isRequired
  }

  toDashboard() {
    NavigatorService.navigate('Wallet');
  }

  render() {
    const {transaction} = this.props;
    let heading = 'Sending...';
    if (transaction === TRANSACTION_SUCCESS) {
      heading = 'Success!';
    } else if (transaction === TRANSACTION_ERROR) {
      heading = 'Error.';
    }

    let subheading;
    if (transaction === TRANSACTION_SUCCESS) {
      subheading = 'Your transaction is pending.';
    }

    return (
      <Scene preload={false}>
        <View style={styles.container}>
          <View style={styles.half}>
          </View>
          <View style={styles.half}>
            <T.Heading style={styles.heading}>{heading}</T.Heading>
            <Try condition={!!subheading}>
              <T.SubHeading style={styles.subheading}>{subheading}</T.SubHeading>
            </Try>
            <Try condition={transaction !== TRANSACTION_PENDING}>
              <Button style={styles.actionButton} onPress={this.toDashboard}>
                Go To Dashboard
              </Button>
            </Try>
          </View>
        </View>
      </Scene>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  half: {
    flex: 1
  },
  heading: {
    color: 'white',
    textAlign: 'center'
  },
  subheading: {
    color: 'white',
    textAlign: 'center'
  },
  actionButton: {
    marginTop: 'auto',
    marginBottom: 30
  }
});
