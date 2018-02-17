import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';

import T from 'components/Typography';
import { initializeWallet } from '../WalletInstances';
import SelectCoin from './SelectCoin';
import Step1 from './Step1';
import Step2 from './Step2';
import Confirm from './Confirm';
import { SYMBOL_ETH } from '../constants';
import NavigatorService from '../../../navigator';
import Modal from '../Modal';
import Button from 'components/Button';

export default class Mnemonic extends Component {
  static propTypes = {
    createWallet: PropTypes.func.isRequired,
    wallet: PropTypes.shape({
      create_successful: PropTypes.bool.isRequired
    }).isRequired
  };

  constructor() {
    super();
    this.state = {
      step: 1,
      coin: null,
      modalOpen: false,
      wallet: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.wallet.create_successful) {
      this.setState({ modalOpen: true });
    }
  }

  generateNewWallet(symbol) {
    const wallet = initializeWallet(symbol);
    return wallet;
  }

  generateConfirmationList = () => {
    const rand1 = Math.floor(Math.random() * 12);
    const rand2 = Math.floor(Math.random() * 12);

    const list = this.state.wallet._wallet.mnemonic.split(' ');
    const confirmList = [
      { i: list.indexOf(list[rand1]), word: list[rand1] },
      { i: list.indexOf(list[rand2]), word: list[rand2] }
    ];
    return confirmList;
  };

  selectCoin = (coin) => {
    this.setState({
      coin,
      wallet: this.generateNewWallet(coin)
    }, this.saveAndContinue);
  }

  saveAndContinue = () => {
    const currentStep = this.state.step;

    const nextStep = currentStep < 4 ? currentStep + 1 : 1;

    const newState = {
      ...this.state,
      step: nextStep
    };
    this.setState(newState);
  };

  goBack = () => {
    const nextStep = 2;

    const newState = {
      ...this.state,
      step: nextStep
    };
    this.setState(newState);
  };

  openModal = () => {
    this.setState({
      modalOpen: true
    });
  };

  cancelModal = () => {
    this.setState({
      modalOpen: false
    });
  };

  saveNewWallet = () => {
    this.props.createWallet(this.state.coin, this.state.wallet._wallet.mnemonic);
  };

  handleRedirect = () => {
    NavigatorService.navigateDeep([
      { routeName: 'Menu' },
      { routeName: 'Wallets' }
    ]);
  };

  getComponentForStep = (step) => {
    if (step === 1) {
      return (
        <SelectCoin saveAndContinue={this.selectCoin} />
      );
    }
    if (step === 2) {
      //eslint-disable-next-line no-console
      console.log(
        'Mnemonic List:',
        this.state.wallet._wallet.mnemonic.split(' ')
      );
      const mnemonicList = this.state.wallet._wallet.mnemonic
        .split(' ')
        .slice(0, 6);
      return (
        <Step1 list={mnemonicList} saveAndContinue={this.saveAndContinue} />
      );
    }
    if (step === 3) {
      const mnemonicList = this.state.wallet._wallet.mnemonic
        .split(' ')
        .slice(6, 12);

      return (
        <Step2
          list={mnemonicList}
          saveAndContinue={this.saveAndContinue}
          goBack={this.goBack}
        />
      );
    }
    if (step === 4) {
      const confirmList = this.generateConfirmationList();
      return (
        <Confirm
          list={confirmList}
          saveAndContinue={this.saveAndContinue}
          saveWallet={this.saveNewWallet}
          goBack={this.goBack}
        />
      );
    }
  }

  render() {
    const { step, modalOpen } = this.state;

    return (
      <View style={styles.container}>
        {this.getComponentForStep(step)}
        <Modal
          show={modalOpen}
          title="Select Currency"
          onCancel={this.handleRedirect}
          onDone={this.handleRedirect}
        >
          <ScrollView bounces={false} style={styles.scrollView}>
            <View style={styles.headerContainer}>
              <T.Heading style={styles.headingStyle}>SUCCESS</T.Heading>
            </View>
            <View>
              <T.Light style={styles.headingStyle}>
                Paper key was confirmed!
              </T.Light>

              <Button type="secondary" onPress={this.handleRedirect}>
                Go To My Wallet
              </Button>
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#223252'
  },
  headingStyle: {
    color: '#ffffff'
  },
  bodyContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 0
  },
  refresh: {},
  footerContainer: {
    padding: 20
  },
  mnemonicList: {},
  mnemonicChoice: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#223252',
    marginBottom: 20,
    flexDirection: 'column'
  },
  mnemonicChoiceNumner: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 12
  },
  mnemonicChoiceText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 14
  },
  scrollView: {
    marginVertical: 10
  }
});
