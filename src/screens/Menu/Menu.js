/**
 * Custom Drawer Menu
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { signOut } from 'sagas/authentication';
import NavigatorService from 'lib/navigator';

class Menu extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    signOut: PropTypes.func.isRequired,
  };

  navigateTo = route => {
    this.props.navigation.navigate(route)
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageView}
          imageStyle={styles.image}
          source={
            require('assets/BackgroundBlue.png') // eslint-disable-line no-undef
          }
        >
          <ScrollView style={{ paddingTop: 40 }}>
            <View style={{ backgroundColor: 'transparent', flex: 1 }}>
              <View style={{ alignSelf: 'flex-end' }}>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}
                  onPress={() => NavigatorService.closeDrawer()}
                >
                  <Icon icon="ios-close-outline" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.linkWrapper}
                onPress={() => this.navigateTo('Wallet')}
              >
                <Text style={styles.linkContent}>Wallet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linkWrapper}
                onPress={() => this.navigateTo('Settings')}
              >
                <Text style={styles.linkContent}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linkWrapper}
                onPress={() => this.navigateTo('Authenticate')}
              >
                <Text style={styles.linkContent}>Authenticate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linkWrapper}
                onPress={() => this.navigateTo('Store')}
              >
                <Text style={styles.linkContent}>Store</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.footerContainer}>
            <Button onPress={() => this.props.signOut()}>LOG OUT</Button>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { signOut })(Menu);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerContainer: {
    padding: 20,
  },
  imageView: {
    flex: 1,
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
  linkContent: {
    color: '#ffffff',
    fontWeight: '700',
    padding: 10,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
});
