import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

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
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <T.Heading style={{ color: '#ffffff' }}>Confirm Word List </T.Heading>
        </View>
        <View style={styles.bodyContainer}>
          <T.Light>
            Please confirm your recovery phrase.
          </T.Light>
          {this.props.answers.map((answer, i) => (
            <T.Light style={styles.answer} key={i}>
              <T.SemiBold>
                {answer}
              </T.SemiBold>
            </T.Light>
          ))}
          {this.state.error &&
            <T.Small>Hm.... Are you sure you got that right?</T.Small>
          }
          <Button
            type="primary"
            style={styles.statusCheck}
            disabled={this.state.error}
            onPress={this.checkWallet}
          >
            Looks Good!
          </Button>
          <Button
            type={this.state.error ? 'primary' : 'text'}
            style={styles.textButton}
            onPress={this.handleGoBack}
          >
            {LANG_PREV_TEXT}
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
  },
  container: {
    flex: 1
  },
  headerContainer: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#223252'
  },
  bodyContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 0
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
