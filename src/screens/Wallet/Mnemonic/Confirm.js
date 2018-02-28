import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput } from 'react-native';

import Button from 'components/Button';
import T from 'components/Typography';
import LottieView from 'lottie-react-native';
import withDismissableKeyboard from 'hocs/withDismissableKeyboard';

import success from 'assets/animations/check.json';
import error from 'assets/animations/error.json';

const DismissableView = withDismissableKeyboard(View);

const LANG_PREV_TEXT = 'Go back and review...';

export default class Confirm extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    saveWallet: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  };

  state = {
    allChecksPassed: false,
    animateList: false,
    exitAnimation: false,
    0: { value: '', confirmed: false },
    1: { value: '', confirmed: false }
  };

  updateFormField = fieldName => text => {
    this.setState({
      ...this.state,
      [fieldName]: {
        ...this.state[fieldName],
        value: text
      }
    });
  };

  checkFields = key => {
    const valid = this.props.list[key].word === this.state[key].value;

    this.setState(
      {
        ...this.state,
        [key]: {
          ...this.state[key],
          confirmed: valid
        }
      },
      () => this[`animation_${key}`].play()
    );

    this.checkFormState();
  };

  checkFormState = () => {
    if (
      this.props.list[0].word === this.state[0].value &&
      this.props.list[1].word === this.state[1].value
    ) {
      this.setState({ allChecksPassed: true });
    } else {
      this.setState({ allChecksPassed: false });
    }
  };

  handleGoBack = () => {
    this.props.goBack();
  };

  render() {
    if (__DEV__) {
      //eslint-disable-next-line no-console
      console.log(
        'The words you need are',
        this.props.list[0].word,
        this.props.list[1].word
      );
    }
    const placeholderTextColor = 'rgba(0,0,0,0.35)';

    return (
      <DismissableView style={styles.container}>
        <View style={styles.headerContainer}>
          <T.Heading style={{ color: '#ffffff' }}>Confirm Word List </T.Heading>
        </View>
        <View style={styles.bodyContainer}>
          <T.Light>
            To make sure everything was written down correctly, please enter the
            following words from your paper key.
          </T.Light>

          {this.props.list.map((word, i) => {
            const number = word.i + 1; // human readable numbers
            return (
              <View style={styles.inputRow} key={`confirm-${i}`}>
                <View style={styles.inputWrapper}>
                  <T.Light
                    style={styles.inputLable}
                  >{`Word #${number}`}</T.Light>

                  <TextInput
                    ref={el => (this.loginPasswordInput = el)}
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={`What was word #${number}`}
                    placeholderTextColor={placeholderTextColor}
                    returnKeyType="next"
                    onChangeText={this.updateFormField(i)}
                    onBlur={() => this.checkFields(i)}
                    editable={!this.state[i].confirmed}
                  />
                </View>
                <View style={styles.animationWrapper}>
                  <LottieView
                    source={this.state[i].confirmed ? success : error}
                    style={styles.animation}
                    ref={ref => {
                      this[`animation_${i}`] = ref;
                    }}
                  />
                </View>
              </View>
            );
          })}
          <Button
            type="primary"
            style={styles.statusCheck}
            onPress={this.props.saveWallet}
            disabled={!this.state.allChecksPassed}
          >
            Create My Wallet!
          </Button>
          <Button
            type="text"
            style={styles.textButton}
            onPress={this.handleGoBack}
          >
            {LANG_PREV_TEXT}
          </Button>
        </View>
      </DismissableView>
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
  inputLable: {
    fontSize: 12,
    color: '#888888'
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
