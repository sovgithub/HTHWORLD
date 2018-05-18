import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import SuccessFailureScreen, {TYPE_SUCCESS} from 'components/SuccessFailureScreen';
import Scene from 'components/Scene';

import Type from './Type';
import Recover from './Recover';
import Generate from './Generate';
import NavigatorService from 'lib/navigator';

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
    if (this.props.hasMnemonic) {
      return (
        <SuccessFailureScreen
          type={TYPE_SUCCESS}
          title="Seed Words Input"
          subtitle="Next up, add an additional layer of security by setting up your PIN"
          mainButtonText="Set Up Pin"
          onPressMain={this.handleRedirect}
        />
      );
    }

    if (step === 1) {
      return (
        <Type
          newMnemonicType={GENERATE}
          existingMnemonicType={RECOVER}
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
      <Scene
        withHeader={false}
        duration={0}
      >
        <View style={styles.container}>
          {this.getComponentForStep(this.state.step)}
        </View>
      </Scene>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1
  },
});
