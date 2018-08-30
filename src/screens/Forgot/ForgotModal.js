import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Image, Alert} from 'react-native';
import Config from 'react-native-config';

import api from 'lib/api';
import {validateEmail} from 'lib/string-helpers';
import NavigatorService from 'lib/navigator';
import { Try } from 'components/Conditional';

import { Layout, Header, Body } from 'components/Base';
import Modal from 'components/Modal';
import T from 'components/Typography';
import UnderlineInput from 'components/UnderlineInput';

import { FORGOT_PASSWORD, FORGOT_USERNAME } from 'screens/Forgot/constants';

const icon = {
  [FORGOT_PASSWORD]: require('assets/forgot-password.png'),
  [FORGOT_USERNAME]: require('assets/forgot-username.png'),
};

const apiEndpoints = {
  [FORGOT_PASSWORD]: 'password',
  [FORGOT_USERNAME]: 'forgot_username',
};

export default class ForgotModal extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      setParams: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          type: PropTypes.oneOf([FORGOT_PASSWORD, FORGOT_USERNAME]),
        }),
      }),
    }),
  };

  constructor(props) {
    super(props);

    const forgotType =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.type;

    this.state = {
      email_address: '',
      forgotType,
    };
  }

  handleChangeEmail = value => this.setState({ email_address: value });

  handleForgotRequest = async () => {
    const valid = await validateEmail({email_address: this.state.email_address});
    if (valid !== true) {
      Alert.alert(
        'Error',
        valid.error || 'There was a problem with your email address.',
      );
      return;
    }

    let ENDPOINT = apiEndpoints[this.state.forgotType];

    try {
      const response = await api.post(`${Config.EREBOR_ENDPOINT}/${ENDPOINT}`, {
        email_address: this.state.email_address,
      });

      if (response.success) {
        Alert.alert(
          `An email has been sent to your address with instructions to reset.`
        );
        NavigatorService.navigate('Login');
      } else {
        // eslint-disable-next-line no-console
        if (__DEV__) console.log('response', response);

      }
    } catch (e) {

      // eslint-disable-next-line no-console
      if (__DEV__) console.log(e);

      Alert.alert(
        `Oops! ${e.message}: ${e.errors && e.errors[0] && e.errors[0].message}`
      );
    }
    this.setState({
      loading: false,
    });
  };


  render() {

    return (
      <Modal>
        <Layout preload={false} keyboard>
        <Body scrollable>
          <Header style={{ alignItems: 'center' }}>
            <Image style={styles.icon} source={icon[this.state.forgotType]} />
            <Try condition={this.state.forgotType === FORGOT_PASSWORD}>
              <T.Heading style={styles.heading}>Reset Your Password</T.Heading>
            </Try>
            <Try condition={this.state.forgotType === FORGOT_USERNAME}>
              <T.Heading style={styles.heading}>Reset Your Username</T.Heading>
            </Try>
            <T.Heading style={styles.subheading}>{`We're here to help!`}</T.Heading>
          </Header>
          <Body style={styles.body}>
            <UnderlineInput
              style={styles.input}
              keyboardType="email-address"
              label={`Your Email Address`}
              onChangeText={this.handleChangeEmail}
              value={this.state.email_address}
              autoCorrect={false}
              onSubmitEditing={this.handleForgotRequest}
            />

          </Body>
        </Body>
      </Layout>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  body:{
    marginTop: 20
  },
  heading: {
    marginTop: 20,
    color: 'white',
    fontWeight: '500',
  },
  subheading: {
    fontSize: 24,
    marginTop: 20,
    color: 'white',
    fontWeight: '200',
    letterSpacing: 0.75
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 10,
    marginRight: 10,
  },
});
