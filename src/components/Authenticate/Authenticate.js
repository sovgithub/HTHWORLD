import React, { Component } from 'react';
import { View, StyleSheet, AlertIOS } from 'react-native';
import TouchID from 'react-native-touch-id';

import Icon from 'components/Icon';
import Button from 'components/Button';
import Pin from 'components/Pin';
import NavigatorService from 'lib/navigator';

const androidConfigObject = {
  title: 'Authentication Required',
  color: '#e00606',
};

export default class Authenticate extends Component {
  state = {
    supported: 'none',
    showPin: false,
  };

  componentDidMount() {
    TouchID.isSupported()
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          // console.log('FaceID is supported.');
          this.setState({
            supported: 'faceid',
            label: 'Authenticate with facial recognition',
          });
        } else {
          // console.log('TouchID is supported.');
          this.setState({
            supported: 'touchid',
            label: 'Authenticate with your fingerprint',
          });
        }
      })
      //eslint-disable-next-line no-unused-vars
      .catch(error => {
        // Failure code
        this.setState({
          supported: 'pin',
          label: 'Authenticate by entering your PIN',
        });
        // console.log(error);
      });
  }

  _pressHandler = () => {
    if (this.state.supported === 'pin') {
      this.setState({ showPin: true });
      return;
    }

    TouchID.authenticate('To unlock or authenticate HTHWorld', androidConfigObject)
      //eslint-disable-next-line no-unused-vars
      .then(success => {
        this.onAuthenticationSuccess();
      })
      //eslint-disable-next-line no-unused-vars
      .catch(error => {
        this.onAuthenticationFailed();
      });
  };

  onAuthenticationSuccess() {
    AlertIOS.alert('Authenticated Successfully');
    NavigatorService.navigate('Menu');
  }

  onAuthenticationFailed() {
    AlertIOS.alert('Authentication Failed');
    NavigatorService.navigateDeep([{ routeName: 'Login' }]);
  }

  render() {
    if (this.state.showPin && this.state.supported === 'pin') {
      return <Pin handleSuccess={this.onAuthenticationSuccess} />;
    } else {
      return (
        <View style={styles.viewContainer}>
          <View style={styles.contentContainer}>
            <View>
              {this.state.supported === 'faceid' && (
                <Icon
                  icon="ios-person"
                  style={{ position: 'absolute', color: '#333' }}
                />
              )}
              {this.state.supported === 'touchid' && (
                <Icon
                  icon="ios-finger-print"
                  style={{ position: 'absolute', color: '#333' }}
                />
              )}
            </View>
            <View>
              <Button
                type="primary"
                onPress={this._pressHandler}
                style={styles.button}
              >
                {this.state.label || 'Authenticate to unlock.'}
              </Button>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    padding: 10,
  },
});
