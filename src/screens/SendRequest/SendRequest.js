import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import {gradients, colors, typography} from 'styles';
import Scene from 'components/Scene';
import T from 'components/Typography';
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import UnderlineInput from 'components/UnderlineInput';
import Button from 'components/Button';
import CurrencySelection from './CurrencySelection';
import SelectableImageHeader from 'components/SelectableImageHeader';
import { getCoinMetadata } from 'lib/currency-metadata';
import { formatDecimalInput } from 'lib/formatters';
import Conditional, { Try, Otherwise } from 'components/Conditional';
import {TYPE_SEND, TYPE_REQUEST} from 'screens/SendRequest/constants';
import MenuHeader from 'components/MenuHeader';
import NavigatorService from 'lib/navigator';

const amountFormatter = formatDecimalInput(8);

const initialState = {
  amount: '',
  toAddress: '',
  selectedId: null,
  selectingWallet: false,
};

export default class SendRequest extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          type: PropTypes.oneOf([TYPE_SEND, TYPE_REQUEST])
        })
      })
    }),
    wallets: PropTypes.arrayOf(
      PropTypes.shape({
        balance: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
      })
    ).isRequired,
    sendFunds: PropTypes.func.isRequired,
    requestFunds: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const selectedId = props.navigation.state
      && props.navigation.state.params
      && props.navigation.state.params.wallet;

    this.state = {
      ...initialState,
      selectedId: selectedId ? selectedId : initialState.selectedId
    }
  }

  handleChangeAmount = value =>
    this.setState({ amount: amountFormatter(value) });

  handleChangeToAddress = value => this.setState({ toAddress: value });

  handleSelectCoin = value => () =>
    this.setState(
      {
        amount: '',
        toAddress: '',
        selectedId: value,
        selectingWallet: false,
      },
      this.checkAddress
    );

  toggleCoinSelector = () =>
    this.setState({ selectingWallet: !this.state.selectingWallet });

  validate({ amount, toAddress, selectedId }) {
    const numAmount = Number(amount);
    const selectedWallet = this.props.wallets.find(
      wallet => wallet.id === selectedId
    );
    if (!selectedId) {
      Alert.alert('Please select a wallet to send from');
      return false;
    } else if (!numAmount) {
      Alert.alert('Please input an amount to send');
      return false;
    } else if (numAmount > selectedWallet.balance) {
      Alert.alert('You cannot send more than you have in your wallet');
      return false;
    } else if (!toAddress) {
      Alert.alert('Please an address to send to');
      return false;
    } else {
      return true;
    }
  }

  send = () => {
    if (this.validate(this.state)) {
      const action = this.props.sendFunds(
        this.state.selectedId,
        this.state.toAddress,
        Number(this.state.amount)
      );

      NavigatorService.navigate('TransactionStatus', {
        id: action.id,
        type: TYPE_SEND
      });
    }
  };

  render() {
    const { wallets } = this.props;
    const {
      amount,
      toAddress,
      selectedId,
      selectingWallet,
    } = this.state;

    const selectedWallet = wallets.find(wallet => wallet.id === selectedId);

    const walletTitle =
      selectedWallet
      ? `Sending ${getCoinMetadata(selectedWallet.symbol).fullName} ${
          selectedWallet.symbol
        }`
      : 'Select Currency';

    const currencyDisplay = selectedWallet && {
      title: getCoinMetadata(selectedWallet.symbol).fullName,
      subtitle: selectedWallet.balance,
      image: getCoinMetadata(selectedWallet.symbol).image,
    };

    const title = this.props.navigation.state.params && this.props.navigation.state.params.type === TYPE_SEND
      ? 'Send'
      : 'Request';

    const headerProps = {};

    if (selectingWallet) {
      headerProps.title = 'Select Currency'
      headerProps.leftAction = (
        <TouchableOpacity onPress={this.toggleCoinSelector}>
          <Image source={require('assets/closeicon.png')} />
        </TouchableOpacity>
      );
    } else {
      headerProps.leftAction = 'back'
      headerProps.rightAction = 'menu'
    }

    console.log(selectedWallet);

    return (
      <Scene preload={false}>
        <View style={styles.flex1}>
          <MenuHeader {...headerProps} />
          <Conditional>
            <Try condition={!wallets.length}>
              <T.GrayedOut>You have not yet created any wallets</T.GrayedOut>
            </Try>
            <Try condition={selectingWallet}>
              <CurrencySelection title={walletTitle} items={
                wallets.map(wallet => {
                  console.log(wallet);
                  const metadata = getCoinMetadata(wallet.symbol);

                  return {
                    image: metadata.image,
                    onPress: this.handleSelectCoin(wallet.id),
                    selected: selectedId === wallet.id,
                    subtitle: `${wallet.symbol}    ${wallet.balance}`,
                    title: metadata.fullName,
                  };
                })
              } />
            </Try>

            <Otherwise>
              <View style={[ styles.flex1, styles.contentContainer ]}>
                <T.Heading style={styles.subheading}>
                  {title}
                </T.Heading>
                <UnderlineInput
                  style={styles.input}
                  label="Recipient"
                  onChangeText={this.handleChangeToAddress}
                  value={toAddress}
                />
                <SelectableImageHeader
                  title="Currency"
                  emptyText="Select Currency"
                  selection={currencyDisplay}
                  onPress={this.toggleCoinSelector}
                />
                <UnderlineInput
                  style={styles.input}
                  keyboardType="numeric"
                  label={
                    selectedWallet
                      ? `Enter ${selectedWallet.symbol}`
                      : 'Enter Amount'
                  }
                  onChangeText={this.handleChangeAmount}
                  value={amount.toString()}
                />
                <Button disabled={!selectedId} onPress={this.send}>
                  {title}
                </Button>
              </View>
            </Otherwise>
          </Conditional>
        </View>
      </Scene>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
  },
  input: {
    marginBottom: 20,
  },

  flex1: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  subheading: {
    justifyContent: 'center',
    color: colors.white,
    marginBottom: 20,
  },
  subheadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  changeCoin: {
    alignItems: 'center',
  },
  coinImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
    margin: 10,
    resizeMode: 'cover',
  },
});
