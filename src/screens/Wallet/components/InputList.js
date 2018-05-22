import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, ScrollView, View, Image, TouchableOpacity } from "react-native";

import Button from "components/Button";
import MenuHeader from "components/MenuHeader";
import Input from "components/Input";
import T from "components/Typography";

const LANG_NEXT_TEXT = "Next";

export default class InputList extends Component {
  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    offset: PropTypes.number.isRequired,
    onCancel: PropTypes.func.isRequired,
    updateAnswers: PropTypes.func.isRequired,
    saveAndContinue: PropTypes.func.isRequired
  };

  constructor(props) {
    super();

    this.state = {
      completed: this.isCompleted(props.answers)
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.answers !== this.props.answers) {
      this.setState({
        completed: this.isCompleted(newProps.answers)
      });
    }
  }

  isCompleted = answers => {
    return answers.every(v => !!v);
  };

  updateAnswer = i => answer => {
    const answers = [
      ...this.props.answers.slice(0, i),
      answer,
      ...this.props.answers.slice(i + 1)
    ];

    this.props.updateAnswers(answers);
  };

  handleNextButton = () => {
    this.props.saveAndContinue();
  };

  render() {
    const { answers, offset, onCancel } = this.props;
    const { completed } = this.state;

    return (
      <View style={styles.container}>
        <MenuHeader
          leftAction={(
            <TouchableOpacity onPress={onCancel}>
              <Image source={require('assets/bck.png')} />
            </TouchableOpacity>
          )}
          title="Recover Wallet"
          multipage={true}
          currentPage={2}
          totalPages={3}
        />
        <T.Heading style={styles.headingStyle}>
          Enter Seed Phrase
        </T.Heading>
        <ScrollView bounces={false} style={styles.bodyContainer}>
          {answers.map((answer, i) => {
            return (
              <Input
                key={i}
                style={styles.input}
                autoCapitalize="none"
                returnKeyType="next"
                label={`Word #${i + offset}`}
                value={answer}
                onChangeText={this.updateAnswer(i)}
              />
            );
          })}
          <View style={styles.footerContainer}>
            <T.Light style={{color: 'lightgrey', textAlign: 'center', paddingBottom: 10}}>
              {offset + answers.length - 1} of 12 words
            </T.Light>
            <Button
              style={styles.nextButton}
              disabled={!completed}
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
    flex: 1,
  },
  headingStyle: {
    padding: 20,
    paddingTop: 40,
    color: "#ffffff"
  },
  bodyContainer: {
    padding: 20,
    flexGrow: 1,
  },
  footerContainer: {
    padding: 20,
    marginTop: 20,
  },
  input: {
  },
  nextButton: {
  }
});
