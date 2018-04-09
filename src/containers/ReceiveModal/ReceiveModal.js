import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Clipboard,
  StyleSheet
} from 'react-native';
import T from 'components/Typography';
import Modal from 'components/Modal';
import SelectWalletSection from 'components/SelectWalletSection';

const initialState = {
  selectedWallet: {},
  selectingWallet: false
};

export default class ReceiveModal extends Component {
  static propTypes = {
    wallets: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      publicAddress: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    })).isRequired,
    show: PropTypes.bool.isRequired,
    hideReceiveModal: PropTypes.func.isRequired,
  }

  state = {...initialState};

  componentWillReceiveProps(newProps) {
    if (newProps.show !== this.props.show) {
      this.setState({...initialState});
    }
  }

  handleSelectWallet = (id) => this.setState({
    selectedWallet: this.props.wallets.find(wallet => wallet.id === id),
    selectingWallet: false
  })

  toggleCoinSelector = () => this.setState({selectingWallet: !this.state.selectingWallet})

  copyAddress = () => Clipboard.setString(this.state.selectedWallet.publicAddress);

  render() {
    const {wallets} = this.props;
    const {selectedWallet, selectingWallet} = this.state;

    const actionButtons = wallets.length && !selectingWallet
      ? [{text: 'Copy Address', type: 'primary', onPress: this.copyAddress, disabled: !selectedWallet.publicAddress}]
      : [];

    return (
      <Modal
        show={this.props.show}
        title="Receive"
        onCancel={this.props.hideReceiveModal}
        actionButtons={actionButtons}
      >
        <T.Light style={styles.text}>
          Receive currency, instantly, safely, and anonymously anywhere in the world.
        </T.Light>
        <SelectWalletSection
          wallets={wallets}
          selectedId={selectedWallet.id}
          title={selectedWallet ? `My ${selectedWallet.symbol} Address` : ''}
          selecting={selectingWallet}
          onSelect={this.handleSelectWallet}
          onToggleSelecting={this.toggleCoinSelector}
        >
          <T.GrayedOut>{selectedWallet.publicAddress}</T.GrayedOut>
        </SelectWalletSection>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 20
  }
});
