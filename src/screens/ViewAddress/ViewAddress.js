import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Clipboard, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode';
import { colors } from 'styles';
import T from 'components/Typography';
import Scene from 'components/Scene';
import Button from 'components/Button';
import { getCoinMetadata } from 'lib/currency-metadata';
import { Try } from 'components/Conditional';

export default class ViewAddress extends Component {
  static propTypes = {
    wallet: PropTypes.shape({
      id: PropTypes.string.isRequired,
      publicAddress: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    }).isRequired,
  };

  copyAddress = () => Clipboard.setString(this.props.wallet.publicAddress);

  render() {
    const { wallet } = this.props;

    return (
      <Scene preload={false}>
        <View style={styles.container}>
          <Try condition={!!wallet}>
            <View style={styles.qrcontainer}>
              <QRCode
                value={wallet.publicAddress}
                size={200}
                fgColor={colors.grayDarker}
                bgColor={colors.white}
              />
            </View>

            <View style={styles.addressContainer}>
              <T.GrayedOut style={styles.title}>
                {getCoinMetadata(wallet.symbol).fullName} Address
              </T.GrayedOut>
              <View style={styles.row}>
                <Image
                  style={styles.image}
                  source={getCoinMetadata(wallet.symbol).image}
                />
                <T.Small style={styles.address}>{wallet.publicAddress}</T.Small>
              </View>
            </View>
          </Try>
          <Button style={styles.button} onPress={this.copyAddress}>
            Copy Address
          </Button>
        </View>
      </Scene>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  addressContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  qrcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '300',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    marginRight: 20,
  },
  address: {
    color: '#00bcf8',
  },
  button: {
    marginTop: 'auto',
  },
});
