import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  StyleSheet
} from 'react-native';
import T from 'components/Typography';
import Modal from 'components/Modal';
import Input from 'components/Input';
import SelectWalletSection from 'components/SelectWalletSection';
import {getCoinMetadata} from 'lib/currency-metadata';
import {formatDecimalInput} from 'lib/formatters';

const amountFormatter = formatDecimalInput(8);

const initialState = {
  amount: '',
  toAddress: '',
  selectedAddress: null,
  selectingWallet: false
};

export default class SendModal extends Component {
  static propTypes = {
    wallets: PropTypes.arrayOf(PropTypes.shape({
      balance: PropTypes.number.isRequired,
      publicAddress: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    })).isRequired,
    show: PropTypes.bool.isRequired,
    hideSendModal: PropTypes.func.isRequired,
    sendFunds: PropTypes.func.isRequired
  }

  state = {...initialState}

  componentWillReceiveProps(newProps) {
    if (newProps.show !== this.props.show) {
      this.setState({...initialState});
    }
  }

  handleChangeAmount = (value) => this.setState({amount: amountFormatter(value)})

  handleChangeToAddress = (value) => this.setState({toAddress: value})

  handleSelectCoin = (value) => this.setState({
    amount: '',
    toAddress: '',
    selectedAddress: value,
    selectingWallet: false
  })

  toggleCoinSelector = () => this.setState({selectingWallet: !this.state.selectingWallet})

  validate({amount, toAddress, selectedAddress}) {
    const numAmount = Number(amount);
    const selectedWallet = this.props.wallets.find((wallet) => wallet.publicAddress === selectedAddress);
    if (!selectedAddress) {
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
      this.props.sendFunds(
        this.state.selectedAddress,
        this.state.toAddress,
        Number(this.state.amount)
      );
    }
  }

  render() {
    const {wallets} = this.props;
    const {
      amount,
      toAddress,
      selectedAddress,
      selectingWallet
    } = this.state;

    const selectedWallet = wallets.find((wallet) => wallet.publicAddress === selectedAddress);
    const actionButtons = wallets.length && !selectingWallet
      ? [
        {text: 'Confirm', type: 'primary', onPress: this.send, disabled: !selectedAddress},
        {text: 'Cancel', type: 'text', onPress: this.props.hideSendModal}
      ]
      : [];

    return (
      <Modal
        show={this.props.show}
        title="Send"
        onCancel={this.props.hideSendModal}
        actionButtons={actionButtons}
      >
        <T.Light style={styles.text}>
          Send currency, instantly, safely, and anonymously anywhere in the world.
        </T.Light>
        <SelectWalletSection
          wallets={wallets}
          selectedAddress={selectedAddress}
          title={selectedWallet ? `Sending ${getCoinMetadata(selectedWallet.symbol).fullName} ${selectedWallet.symbol}` : ''}
          selecting={selectingWallet}
          onSelect={this.handleSelectCoin}
          onToggleSelecting={this.toggleCoinSelector}
        >
          <Input
            light={true}
            style={styles.input}
            keyboardType="numeric"
            placeholder={selectedWallet && `Enter Amount -- ${selectedWallet.balance} available`}
            onChangeText={this.handleChangeAmount}
            value={amount.toString()}
          />
          <Input
            light={true}
            style={styles.input}
            placeholder="Enter Address"
            onChangeText={this.handleChangeToAddress}
            value={toAddress}
          />
        </SelectWalletSection>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 20
  },
  input: {
    marginBottom: 20
  }
});
