import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, View } from 'react-native';
import Button from 'components/Button';
import T from 'components/Typography';
import Animations, { FADE, SLIDE_Y } from 'hocs/Animations';

const LANG_NEXT_TEXT = 'Next';

export default class Step1 extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.string).isRequired,
    saveAndContinue: PropTypes.func.isRequired
  };

  state = { animateList: false, exitAnimation: false };

  componentDidMount() {
    this.startListAnimation();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.list !== nextProps.list) {
      this.startListAnimation();
    }
  }

  startListAnimation = () => {
    this.setState({ animateList: true });
  };

  animationDidFinish = () => {
    this.setState({ animateList: false });
  };

  handleNextButton = () => {
    this.setState({ animateList: false, exitAnimation: true });
  };

  handleExitAnimation = () => {
    this.props.saveAndContinue();
  };

  render() {
    const { animateList, exitAnimation } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <T.Heading style={styles.headingStyle}>
            Mnemonic - Words 1-6
          </T.Heading>
        </View>
        <ScrollView bounces={false} style={styles.bodyContainer}>
          <T.Light>
            Write down each word in order and store it in a safe place.
            Seriously, do this!
          </T.Light>
          <Animations
            style={{ marginTop: 20 }}
            animations={[
              { type: FADE, parameters: { start: 0, end: 1 } },
              { type: SLIDE_Y, parameters: { start: 80, end: 0 } }
            ]}
            enterDelay={50}
            enterDuration={500}
            enterStagger={100}
            exitDelay={0}
            exitDuration={100}
            exitStagger={30}
            startAnimation={animateList}
            onEnterComplete={this.animationDidFinish}
            exitAnimation={exitAnimation}
            onExitComplete={this.handleExitAnimation}
          >
            {this.props.list.map((word, i) => {
              return (
                <View key={`word-${i}`} style={styles.mnemonicChoice}>
                  <T.Light style={styles.mnemonicChoiceNumner}>{`Word #${i +
                    1}: `}</T.Light>
                  <T.SemiBold style={styles.mnemonicChoiceText}>
                    {word}
                  </T.SemiBold>
                </View>
              );
            })}
          </Animations>
          <View style={styles.footerContainer}>
            <Button
              type="primary"
              disabled={this.state.animateList || exitAnimation}
              onPress={this.handleNextButton}
            >
              {LANG_NEXT_TEXT}
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#223252'
  },
  headingStyle: {
    color: '#ffffff'
  },
  bodyContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 0
  },
  footerContainer: {
    padding: 20
  },
  mnemonicList: {},
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
  }
});
