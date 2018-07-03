import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { View, Clipboard, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode';
import { colors } from 'styles';
import T from 'components/Typography';
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import LoadingSpinner from 'components/LoadingSpinner';
import { getCoinMetadata } from 'lib/currency-metadata';
import Conditional, { Try, Otherwise } from 'components/Conditional';
import Link from 'components/Link';

export default class ViewAddress extends Component {
  static propTypes = {
    wallet: PropTypes.shape({
      id: PropTypes.string.isRequired,
      publicAddress: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    QRSize: 0,
    QRMeasured: false,
    addressCopied: false,
  }

  measureQRAffordance = ({ nativeEvent: { layout: { height, width } } }) => this.setState({
    QRSize: (height > width ? width : height) - 20,
    QRMeasured: true
  });

  copyAddress = async () => {
    await Clipboard.setString(this.props.wallet.publicAddress);
    this.setState({addressCopied: true});
  };

  render() {
    const { wallet } = this.props;

    return (
      <Modal
        title="Wallet Address"
        footer={(
          <Fragment>
            <Link
              icon={<Icon icon="ios-photos-outline" style={{size: 20, color: 'white'}} />}
              title="Copy Address"
              onPress={this.copyAddress}
              arrowOverride={
                this.state.addressCopied
                  ? (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{marginVertical: -10}}>
                        <Icon icon="ios-checkmark" style={{size: 30, color: 'green'}} />
                      </View>
                      <T.Light style={{color: 'green', marginLeft: 5}}>
                        Copied
                      </T.Light>
                    </View>
                  )
                  : <View />
              }
            />
          </Fragment>
        )}
      >
        <Try condition={!!wallet}>
          <View style={styles.qrcontainer} onLayout={this.measureQRAffordance}>
            <Conditional>
              <Try condition={this.state.QRMeasured}>
                <View style={styles.qrbackground}>
                  <QRCode
                    value={wallet.publicAddress}
                    size={this.state.QRSize}
                    fgColor={colors.grayDarker}
                    bgColor={colors.white}
                  />
                </View>
              </Try>
              <Otherwise>
                <LoadingSpinner />
              </Otherwise>
            </Conditional>
          </View>
          <View style={styles.addressContainer}>
            <Image
              style={styles.image}
              source={getCoinMetadata(wallet.symbol).image}
            />
            <T.SemiBold style={styles.address}>{wallet.publicAddress}</T.SemiBold>
          </View>
        </Try>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  addressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrbackground: {
    backgroundColor: 'white',
    borderRadius: 7.5,
    padding: 10,
  },
  qrcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
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
  },
  address: {
    color: 'white',
    margin: 20,
    textAlign: 'center',
  },
  button: {
  },
});
