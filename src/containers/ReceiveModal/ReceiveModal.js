import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Clipboard, StyleSheet } from 'react-native';
import T from 'components/Typography';
import Modal from 'components/Modal';
import SelectableImageList from 'components/SelectableImageList';
import SelectableImageHeader from 'components/SelectableImageHeader';
import Conditional, { Try, Otherwise } from 'components/Conditional';
import { getCoinMetadata } from 'lib/currency-metadata';

const initialState = {
  selectedWallet: {},
  selectingWallet: false,
};

export default class ReceiveModal extends Component {
  static propTypes = {
    wallets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        publicAddress: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
      })
    ).isRequired,
    show: PropTypes.bool.isRequired,
    hideReceiveModal: PropTypes.func.isRequired,
  };

  state = { ...initialState };

  componentWillReceiveProps(newProps) {
    if (newProps.show !== this.props.show) {
      this.setState({ ...initialState });
    }
  }

  handleSelectWallet = id => () =>
    this.setState({
      selectedWallet: this.props.wallets.find(wallet => wallet.id === id),
      selectingWallet: false,
    });

  toggleCoinSelector = () =>
    this.setState({ selectingWallet: !this.state.selectingWallet });

  copyAddress = () =>
    Clipboard.setString(this.state.selectedWallet.publicAddress);

  render() {
    const { wallets } = this.props;
    const { selectedWallet, selectingWallet } = this.state;

    const actionButtons =
      wallets.length && !selectingWallet
        ? [
            {
              text: 'Copy Address',
              type: 'primary',
              onPress: this.copyAddress,
              disabled: !selectedWallet.publicAddress,
            },
          ]
        : [];

    return (
      <Modal
        show={this.props.show}
        title="Receive"
        onCancel={this.props.hideReceiveModal}
        actionButtons={actionButtons}
      >
        <T.Light style={styles.text}>
          Receive currency, instantly, safely, and anonymously anywhere in the
          world.
        </T.Light>

        <Conditional>
          <Try condition={!wallets.length}>
            <T.GrayedOut>You have not yet created any wallets</T.GrayedOut>
          </Try>

          <Try condition={selectingWallet}>
            <SelectableImageList
              items={wallets.map(wallet => {
                const metadata = getCoinMetadata(wallet.symbol);

                return {
                  image: metadata.image,
                  onPress: this.handleSelectWallet(wallet.id),
                  selected: selectedWallet.id === wallet.id,
                  subtitle: wallet.symbol,
                  title: metadata.fullName,
                };
              })}
            />
          </Try>

          <Otherwise>
            <View style={styles.flex1}>
              <SelectableImageHeader
                title={
                  selectedWallet.id
                    ? `My ${selectedWallet.symbol} Address`
                    : 'No Wallet Selected'
                }
                imageSource={
                  selectedWallet && getCoinMetadata(selectedWallet.symbol).image
                }
                changePosition="above"
                onPress={this.toggleCoinSelector}
              />
              {selectedWallet && (
                <View style={styles.flex1}>
                  <T.GrayedOut>{selectedWallet.publicAddress}</T.GrayedOut>
                </View>
              )}
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
});
