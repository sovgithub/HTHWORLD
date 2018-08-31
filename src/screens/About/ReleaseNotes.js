import React, {Fragment} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import T from 'components/Typography';
import { Layout, Body } from 'components/Base';
import Config from 'react-native-config';

export default function ReleaseNotes() {
  return (
    <Layout preload={false} keyboard>
      <Body scrollable style={styles.body}>
        <Body>
          <T.Heading style={[styles.type, styles.header]}>
            Release Notes
          </T.Heading>
          {Config.CURRENCY_NETWORK_TYPE !== 'main' &&
            <Fragment>
              <View style={styles.testnetWarning}>
                <View style={styles.testnetIconWrapper}>
                  <Text style={styles.testnetIcon}>!</Text>
                </View>
                <View style={styles.testnetBody}>
                  <T.SubHeading style={styles.testnetHeader}>Do Not Use Real Cryptocurrency</T.SubHeading>
                  <T.Light style={styles.testnetContent}>
                    The Hoard beta app is a testnet beta app.
                    If you use real cryptocurrency, you will lose it.
                  </T.Light>
                </View>
              </View>
              <View style={styles.introText}>
                <T.Light style={styles.type}>
                  Thank you for participating in the Hoard public beta test!
                </T.Light>
                <T.Light style={styles.type}>
                  This version of the app is a TESTNET version,
                  meaning that you MUST NOT USE REAL BITCOIN OR ETHER WITH THE APP.
                </T.Light>
                <T.Light style={styles.type}>
                  To obtain test currencies, use a "Ropsten Ether faucet" and a
                  "Bitcoin Testnet faucet". On these sites, you can input the
                  Bitcoin and Ethereum addresses found within this app in your wallet,
                  and receive test Bitcoin and Ether to play with and help us by testing the app.
                </T.Light>
                <T.Light style={styles.type}>
                  To report bugs, leave us a bug report at github.com/hoardinvest/hoard,
                  or use the support form in the app found under Get Help > Submit a Request.
                </T.Light>
                <T.Light style={styles.type}>
                  For more information, visit us on telegram at t.me/hoardinvest
                  and thanks again for your support!
                </T.Light>
              </View>
            </Fragment>
          }
          <T.SubHeading style={styles.subheading}>
            Release 1.0
          </T.SubHeading>
          <T.Light style={styles.type}>
            &bull;  🎉 🎉 🎉 🎉 🎉
          </T.Light>
        </Body>
      </Body>
    </Layout>
  );
}

const styles = StyleSheet.create({
  testnetWarning: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#ff6161',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  testnetIconWrapper: {
    height: 40,
    width: 40,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'white',
  },
  testnetIcon: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
  },
  testnetBody: {
    flex: 1
  },
  testnetHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  testnetContent: {
    fontSize: 12,
    color: 'white',
  },
  introText: {
  },
  header: {
  },
  subheading: {
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 20
  },
  body: {
    padding: 20,
  },
  type: {
    color: 'white',
    marginBottom: 10,
  },
});
