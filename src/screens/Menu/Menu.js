/**
 * Custom Drawer Menu
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { signOut } from 'sagas/authentication';
import { allPricesLoadedSelector, totalHoldingsSelector } from 'sagas/pricing/selectors';
import { isSignedInSelector, userFullNameSelector } from 'containers/User/selectors';
import NavigatorService from 'lib/navigator';
import { gradients } from 'styles';
import LinearGradient from 'react-native-linear-gradient';
import Conditional, { Try, Otherwise } from 'components/Conditional';
import Config from 'react-native-config';

class Menu extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    isSignedIn: PropTypes.bool,
    userFullName: PropTypes.string,
    totalHoldings: PropTypes.number,
    allPricesLoaded: PropTypes.bool,
    signOut: PropTypes.func.isRequired,
  };

  navigateTo = route => {
    NavigatorService.navigate(route);
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          start={gradients.vertical.start}
          end={gradients.vertical.end}
          colors={gradients.blue}
          style={styles.container}
        >
          <ScrollView style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.header}>
                <Try condition={Config.CURRENCY_NETWORK_TYPE === 'test'}>
                  <View style={styles.testnetContainer}>
                    <View style={styles.testnetBackground}>
                      <Text style={styles.testnetText}>TESTNET VERSION</Text>
                    </View>
                  </View>
                </Try>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 0,
                  }}
                  onPress={() => NavigatorService.closeDrawer()}
                >
                  <Icon icon="ios-close-outline" />
                </TouchableOpacity>
              </View>
              <Try condition={this.props.isSignedIn && !!this.props.userFullName}>
                <Text style={styles.userFullName}>
                  {this.props.userFullName}
                </Text>
              </Try>
              <Text
                style={[
                  styles.totalHoldings,
                  this.props.allPricesLoaded
                    ? styles.totalHoldingsLoaded
                    : styles.totalHoldingsRequesting
                ]}
              >
                ${this.props.totalHoldings.toFixed(2)}
              </Text>

              <View style={styles.subHeadingContainer}>
                <Text style={styles.subHeading}>Payments</Text>
              </View>
              <TouchableOpacity
                style={styles.linkWrapper}
                onPress={() => this.navigateTo('Wallet')}
              >
                <Text style={styles.linkContent}>WALLET</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linkWrapper}
                onPress={() => this.navigateTo('GetHelp')}
              >
                <Text style={styles.linkContent}>GET HELP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linkWrapper}
                onPress={() => this.navigateTo('Settings')}
              >
                <Text style={styles.linkContent}>SETTINGS</Text>
              </TouchableOpacity>

              <View style={styles.subHeadingContainer}>
                <Text style={styles.subHeading}>Info</Text>
              </View>
              <TouchableOpacity
                style={styles.linkWrapper}
                onPress={() => this.navigateTo('Legal')}
              >
                <Text style={styles.linkContent}>LEGAL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linkWrapper}
                onPress={() => this.navigateTo('About')}
              >
                <Text style={styles.linkContent}>ABOUT</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.footerContainer}>
            <Conditional>
              <Try condition={this.props.isSignedIn}>
                <Button type="base" onPress={() => this.props.signOut()}>
                  LOG OUT
                </Button>
              </Try>
              <Otherwise>
                <Button type="base" onPress={() => this.navigateTo('Login')}>
                  Sign Up or Log In
                </Button>
              </Otherwise>
            </Conditional>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSignedIn: isSignedInSelector(state),
    allPricesLoaded: allPricesLoadedSelector(state),
    totalHoldings: totalHoldingsSelector(state),
    userFullName: userFullNameSelector(state),
  };
}

export default connect(mapStateToProps, { signOut })(Menu);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
    paddingTop: 40,
    flex: 1
  },
  body: {
    backgroundColor: 'transparent',
    flex: 1
  },
  header: {
    alignSelf: 'flex-end',
    flexDirection: 'row'
  },
  testnetContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  testnetBackground: {
    padding: 5,
    backgroundColor: '#ff6161',
    borderRadius: 5,
    marginRight: 'auto'
  },
  testnetText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  },
  footerContainer: {
    padding: 20,
  },
  imageView: {
    flex: 1,
  },
  userFullName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'HelveticaNeue-Bold',
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 16,
  },
  totalHoldings: {
    fontSize: 16,
    fontFamily: 'HelveticaNeue-Bold',
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 0,
    lineHeight: 20,
  },
  totalHoldingsLoaded: {
    color: '#FFFFFF',
  },
  totalHoldingsRequesting: {
    color: '#999',
  },
  image: {
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  linkWrapper: {
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  subHeadingContainer: {
    paddingVertical: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(151, 151, 151, 0.21)',
  },
  subHeading: {
    color: 'darkgrey',
  },
  linkContent: {
    flex: 1,
    color: '#ffffff',
    fontWeight: '700',
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
  },
});
