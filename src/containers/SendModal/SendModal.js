import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import Contacts from 'react-native-contacts';

import T from 'components/Typography';
import Modal from 'components/Modal';
import Input from 'components/Input';
import SelectableImageList from 'components/SelectableImageList';
import SelectableImageHeader from 'components/SelectableImageHeader';
import { getCoinMetadata } from 'lib/currency-metadata';
import { formatDecimalInput } from 'lib/formatters';
import Conditional, { Try, Otherwise } from 'components/Conditional';

import { getDataForEmailSymbol } from 'sagas/contacts/reducer';

const amountFormatter = formatDecimalInput(8);

const initialState = {
  amount: '',
  toAddress: '',
  selectedId: null,
  selectingWallet: false,
  selectingContact: false,
  contacts: [],
  selectedContact: null,
};

export default class SendModal extends Component {
  static propTypes = {
    contacts: PropTypes.object,
    wallets: PropTypes.arrayOf(
      PropTypes.shape({
        balance: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
      })
    ).isRequired,
    show: PropTypes.bool.isRequired,
    hideSendModal: PropTypes.func.isRequired,
    sendFunds: PropTypes.func.isRequired,
  };

  state = { ...initialState };

  componentWillMount() {
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message:
          'Hoard would like to access your contact list to send funds to your friends.',
      })
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Contacts.getAll((err, rawContacts) => {
              const contacts = rawContacts.reduce((validContacts, contact) => {
                if (contact.emailAddresses[0]) {
                  return [...validContacts, contact];
                } else {
                  return validContacts;
                }
              }, []);
              this.setState({ contacts });
            });
          } else {
            // Handle
          }
        })
        .catch(err => {
          console.log('PermissionsAndroid', err);
        });
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.show !== this.props.show) {
      let stateReset = { ...initialState, contacts: this.state.contacts };
      if (newProps.show && newProps.selectedWalletId) {
        stateReset.selectedId = newProps.selectedWalletId;
      }
      this.setState(stateReset);
    }

    if (newProps.contacts !== this.props.contacts) {
      this.trySetAddress(newProps.contacts);
    }
  }

  trySetAddress = contactsState => {
    try {
      const { selectedContact, selectedId } = this.state;
      const email = selectedContact.emailAddresses[0].email;
      const selectedWallet = this.props.wallets.find(
        wallet => wallet.id === selectedId
      );
      const data = getDataForEmailSymbol(
        contactsState,
        email,
        selectedWallet.symbol
      );
      if (data.address) {
        this.setState({ toAddress: data.address });
        return true;
      }
    } catch (e) {
      /**/
    }
    return false;
  };

  checkAddress = () => {
    const didSetAddress = this.trySetAddress(this.props.contacts);

    if (!didSetAddress) {
      const { selectedContact, selectedId } = this.state;
      if (selectedContact && selectedId) {
        const email = selectedContact.emailAddresses[0].email;
        const selectedWallet = this.props.wallets.find(
          wallet => wallet.id === selectedId
        );

        if (selectedWallet) {
          this.props.selectContact(email, selectedWallet.symbol);
        }
      }
    }
  };

  handleChangeContact = selectedContact => () => {
    this.setState(
      {
        selectedContact,
        selectingContact: false,
      },
      this.checkAddress
    );
  };

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

  toggleContactSelector = () =>
    this.setState({ selectingContact: !this.state.selectingContact });

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
      this.props.sendFunds(
        this.state.selectedId,
        this.state.toAddress,
        Number(this.state.amount)
      );
    }
  };

  render() {
    const { wallets } = this.props;
    const {
      amount,
      contacts,
      toAddress,
      selectedId,
      selectedContact,
      selectingWallet,
      selectingContact,
    } = this.state;

    const isSelecting = selectingWallet || selectingContact;

    const actionButtons =
      wallets.length && !isSelecting
        ? [
            {
              text: 'Confirm',
              type: 'primary',
              onPress: this.send,
              disabled: !selectedId,
            },
            { text: 'Cancel', type: 'text', onPress: this.props.hideSendModal },
          ]
        : [];

    const selectedWallet = wallets.find(wallet => wallet.id === selectedId);

    const defaultContactImage = require('assets/dash_logo.png');

    let selectionList = [];
    if (selectingWallet) {
      selectionList = wallets.map(wallet => {
        const metadata = getCoinMetadata(wallet.symbol);

        return {
          image: metadata.image,
          onPress: this.handleSelectCoin(wallet.id),
          selected: selectedId === wallet.id,
          subtitle: wallet.symbol,
          title: metadata.fullName,
        };
      });
    } else if (selectingContact) {
      selectionList = contacts.map(contact => {
        const names = [
          contact.givenName,
          contact.middleName,
          contact.familyName,
        ].filter(name => name);
        const title = names.join(' ');
        const image = contact.hasThumbnail
          ? { uri: contact.thumbnailPath }
          : defaultContactImage;
        const subtitle =
          contact.emailAddresses[0] && contact.emailAddresses[0].email;

        return {
          image,
          subtitle,
          title,
          selected: this.state.selectedContact === contact,
          onPress: this.handleChangeContact(contact),
        };
      });
    }

    const walletTitle = selectedWallet
      ? `Sending ${getCoinMetadata(selectedWallet.symbol).fullName} ${
          selectedWallet.symbol
        }`
      : 'Select Currency';
    const contactTitle = selectedContact
      ? `Send to ${[
          this.state.selectedContact.givenName,
          this.state.selectedContact.middleName,
          this.state.selectedContact.familyName,
        ]
          .filter(name => name)
          .join(' ')}`
      : 'Select Contact';

    let selectionTitle = '';
    if (selectingWallet) {
      selectionTitle = walletTitle;
    } else if (selectingContact) {
      selectionTitle = contactTitle;
    }

    const contactImage =
      this.state.selectedContact &&
      (this.state.selectedContact.hasThumbnail
        ? { uri: this.state.selectedContact.thumbnailPath }
        : defaultContactImage);
    return null;
    return (
      <Modal
        show={false}
        title="Send Funds"
        onCancel={this.props.hideSendModal}
        actionButtons={actionButtons}
      >
        <T.Light style={styles.text}>
          Send currency, instantly, safely, and anonymously anywhere in the
          world.
        </T.Light>

        <Conditional>
          <Try condition={!wallets.length}>
            <T.GrayedOut>You have not yet created any wallets</T.GrayedOut>
          </Try>

          <Try condition={isSelecting}>
            <SelectableImageList title={selectionTitle} items={selectionList} />
          </Try>

          <Otherwise>
            <View style={styles.flex1}>
              <SelectableImageHeader
                title={walletTitle}
                imageSource={
                  selectedWallet && getCoinMetadata(selectedWallet.symbol).image
                }
                changePosition="above"
                onPress={this.toggleCoinSelector}
              />
              <Input
                light={true}
                style={styles.input}
                keyboardType="numeric"
                label={`Enter Amount${
                  selectedWallet
                    ? ` -- ${selectedWallet.balance} available`
                    : ''
                }`}
                onChangeText={this.handleChangeAmount}
                value={amount.toString()}
              />
              <Input
                light={true}
                style={styles.input}
                label="Enter Address"
                onChangeText={this.handleChangeToAddress}
                value={toAddress}
              />
              <SelectableImageHeader
                title={contactTitle}
                imageSource={contactImage}
                changePosition="below"
                onPress={this.toggleContactSelector}
              />
            </View>
          </Otherwise>
        </Conditional>
      </Modal>
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
  subheading: {
    justifyContent: 'center',
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
