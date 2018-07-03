import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Modal from 'components/Modal';
import Button from 'components/Button';
import NavigatorService from 'lib/navigator';
import { RECIPIENT_TYPE_ADDRESS } from 'screens/SendRequest/constants';
import Scanner from 'components/Camera';

export default class QRModal extends Component {
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
    selection: null,
    value: ''
  }
  changeText = value => this.setState({value});

  handleSubmit = () => {
    this.props.navigation.state.params.onChangeRecipient({
      recipientType: RECIPIENT_TYPE_ADDRESS,
      recipient: this.state.value
    });
    NavigatorService.navigate('SendRequest');
  }

  render() {
    return (
      <Modal
        title="Scan QR"
        footer={
          <Button
            style={styles.nextButton}
            onPress={this.handleSubmit}
          >
            NEXT
          </Button>
        }
      >
        <Scanner
          onRead={this.changeText}
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
});
