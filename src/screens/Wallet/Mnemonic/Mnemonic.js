import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import Type from './Type';
import Recover from './Recover';
import Generate from './Generate';
import NavigatorService from 'lib/navigator';
import Modal from '../Modal';

const GENERATE = 'GENERATE';
const RECOVER = 'RECOVER';

export default class Mnemonic extends Component {
  static propTypes = {
    initializeMnemonic: PropTypes.func.isRequired,
    hasMnemonic: PropTypes.bool.isRequired
  };

  state = {
    step: 1,
    type: null
  };

  selectType = type => () => this.setState({type, step: 2});

  goBack = () => this.setState({ step: 1 });

  setMnemonic = mnemonic => this.props.initializeMnemonic(mnemonic);

  handleRedirect = () => {
    NavigatorService.navigate('Wallet');
  };

  getComponentForStep = step => {
    if (step === 1) {
      return (
        <Type
          options={[
            {
              title: "Let's get started!",
              value: GENERATE
            },
            {
              title: "Actually, I've done this before",
              value: RECOVER
            },
          ]}
          goBack={this.handleRedirect}
          saveAndContinue={this.selectType}
        />
      );
    }

    if (step === 2) {
      if (this.state.type === GENERATE) {
      return <Generate goBack={this.goBack} saveAndContinue={this.setMnemonic}/>;
      }
      return <Recover goBack={this.goBack} saveAndContinue={this.setMnemonic}/>;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.getComponentForStep(this.state.step)}
        <Modal
          show={this.props.hasMnemonic}
          title="Mnemonic Saved!"
          onCancel={this.handleRedirect}
          onDone={this.handleRedirect}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
