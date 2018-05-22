import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import MenuHeader from "components/MenuHeader";
import SuccessFailureScreen, {TYPE_FAILURE} from 'components/SuccessFailureScreen';
import Button from 'components/Button';
import T from 'components/Typography';

const LANG_PREV_TEXT = 'Go back and review...';

export default class Confirm extends Component {
  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    testWallet: PropTypes.func.isRequired,
    saveWallet: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  };

  state = {
    error: false
  };

  checkWallet = () => {
    try {
      this.props.testWallet(this.props.answers);
    } catch(e) {
      return this.setState({
        error: true
      });
    }

    this.props.saveWallet(this.props.answers);
  }

  handleGoBack = () => {
    this.props.goBack();
  };

  render() {
    if (this.state.error) {
      return (
        <SuccessFailureScreen
          type={TYPE_FAILURE}
          title="Error"
          mainButtonText="Retry"
          onPressMain={this.handleGoBack}
        />
      );
    }

    return (
      <View style={styles.container}>
        <MenuHeader
          leftAction={(
            <TouchableOpacity onPress={this.props.goBack}>
              <Image source={require('assets/bck.png')} />
            </TouchableOpacity>
          )}
          title="Recover Wallet"
          multipage={true}
          currentPage={3}
          totalPages={3}
        />
        <T.Heading style={styles.heading}>Confirm Word List </T.Heading>
        <View style={styles.bodyContainer}>
          <T.Light style={styles.description}>
            Please confirm your recovery phrase.
          </T.Light>
          {this.props.answers.map((answer, i) => (
            <T.SemiBold style={styles.answer} key={i}>
              {answer}
            </T.SemiBold>
          ))}
          <Button
            style={styles.statusCheck}
            disabled={this.state.error}
            onPress={this.checkWallet}
          >
            Looks Good!
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputRow: {
    marginTop: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  inputWrapper: {
    flexGrow: 1,
    flexDirection: 'column'
  },
  animationWrapper: {},
  animation: {
    width: 70,
    height: 50
  },
  input: {
    flexGrow: 1
  },
  answer: {
    color: 'lightgrey',
  },
  container: {
    flex: 1
  },
  heading: {
    padding: 20,
    paddingTop: 40,
    color: '#fff'
  },
  bodyContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 0
  },
  description: {
    color: 'white',
    paddingBottom: 20,
  },
  statusCheck: {
    marginTop: 40
  },
  footerContainer: {
    padding: 20
  },
  mnemonicChoice: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#223252',
    marginBottom: 20,
    flexDirection: 'column'
  },
  mnemonicChoiceNumner: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 12
  },
  mnemonicChoiceText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 14
  },
  textButton: {
    marginTop: 20,
    marginBottom: 20
  }
});
