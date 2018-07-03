import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, } from 'react-native';
import T from 'components/Typography';
import { Layout, Body, Header } from 'components/Base';
import NavigatorService from 'lib/navigator';
import { Try } from 'components/Conditional';
import { TYPE_SEND, TYPE_REQUEST } from 'screens/SendRequest/constants';
import Link from 'components/Link';
import memoize from 'lodash/memoize';

export default class RecipientSelection extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          isSignedIn: PropTypes.bool,
          transactionType: PropTypes.oneOf([TYPE_REQUEST, TYPE_SEND])
        }),
      }),
    }),
  };

  makeSelection = memoize(selection => () =>
    NavigatorService.navigate(selection, {...this.props.navigation.state.params})
  );

  render() {
    const {isSignedIn, transactionType} = this.props.navigation.state.params;

    return (
      <Layout preload={false}>
        <Header style={styles.container}>
          <T.Heading style={{color: 'white', marginBottom: 20}}>Recipient</T.Heading>
          <T.Light style={{color: 'white'}}>
            Select a contact, manually enter an address, or scan a QR code.
          </T.Light>
        </Header>
        <Body style={styles.container}>
          <Try condition={isSignedIn}>
            <Link
              onPress={this.makeSelection('ContactModal')}
              title="Select or enter contact"
              arrowOverride={<View />}
            />
          </Try>
          <Try condition={transactionType === TYPE_SEND}>
            <Fragment>
              <Link
                onPress={this.makeSelection('AddressModal')}
                title="Enter wallet address"
                arrowOverride={<View />}
              />
              <Link
                onPress={this.makeSelection('QRModal')}
                title="Scan QR"
                arrowOverride={<View />}
              />
            </Fragment>
          </Try>
        </Body>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
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
