import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import T from 'components/Typography';
import Modal from 'components/Modal';
import SelectableImageRow from 'components/SelectableImageRow';
import NavigatorService from 'lib/navigator';
import { getCoinMetadata } from 'lib/currency-metadata';
import memoize from 'lodash/memoize';


export default class CurrencyModal extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          onChangeCurrency: PropTypes.func.isRequired,
          selectedId: PropTypes.string.isRequired,
        }),
      }),
    }),
    wallets: PropTypes.arrayOf(
      PropTypes.shape({
        balance: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  handleSelectCoin = memoize(value => () => this.handleSubmit(value))

  handleSubmit = value => {
    this.props.navigation.state.params.onChangeCurrency(value);
    NavigatorService.navigate('SendRequest');
  }

  render() {
    return (
      <Modal title="Currency">
        <T.Light style={styles.subtitle}>
          Select currency to send.
        </T.Light>
        <ScrollView bounces={false}>
          {this.props.wallets.map(wallet => {
            const metadata = getCoinMetadata(wallet.symbol);
            return (
              <SelectableImageRow
                key={wallet.id}
                image={metadata.image}
                onPress={this.handleSelectCoin(wallet.id)}
                selected={this.props.navigation.state.params.selectedId === wallet.id}
                subtitle={`${wallet.symbol}    ${wallet.balance}`}
                title={metadata.fullName}
              />
            );
          })}
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  subtitle: {
    color: 'white',
    marginBottom: 40
  },
});
