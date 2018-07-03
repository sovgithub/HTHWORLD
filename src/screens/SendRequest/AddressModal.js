import React, { Component }
from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import T from 'components/Typography';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Input from 'components/Input';
import NavigatorService from 'lib/navigator';
import { RECIPIENT_TYPE_ADDRESS } from 'screens/SendRequest/constants';

export default class AddressModal extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          onChangeRecipient: PropTypes.func.isRequired
        }),
      }),
    }),
  };

  state = {
    value: ''
  }

  changeText = value => this.setState({value});

  clear = () => this.setState({value: ''});

  handleSubmit = () => {
    this.props.navigation.state.params.onChangeRecipient({
      recipientType: RECIPIENT_TYPE_ADDRESS,
      recipient: this.state.value
    });
    NavigatorService.navigate('SendRequest');
  }

  render() {
    const clearButton = (
      <TouchableOpacity
        style={styles.action}
        onPress={this.clear}
      >
        <Icon icon="ios-close-circle" style={{ size: 20, color: 'rgba(255,255,255,0.5)' }} />
      </TouchableOpacity>
    );

    return (
      <Modal
        title="Address"
        footer={
          <Button
            style={styles.nextButton}
            onPress={this.handleSubmit}
            >
            NEXT
          </Button>
        }
      >
        <T.Light style={styles.subtitle}>
          Enter wallet address in the field below.
        </T.Light>
        <Input
          type="underline"
          placeholder="Enter address"
          onChangeText={this.changeText}
          value={this.state.value}
          actions={clearButton}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  nextButton: {
    borderRadius: 0,
    marginHorizontal: -20,
    marginBottom: -40
  },
  subtitle: {
    color: 'white',
    marginBottom: 40
  },
});
