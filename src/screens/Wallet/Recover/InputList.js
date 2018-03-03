import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, ScrollView, View } from "react-native";

import Button from "components/Button";
import Input from "components/Input";
import T from "components/Typography";

const LANG_NEXT_TEXT = "Next";
const LANG_CANCEL_TEXT = "Cancel";

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
        <View style={styles.headerContainer}>
          <T.Heading style={styles.headingStyle}>
            Recover - Words {offset}-{offset + answers.length - 1}
          </T.Heading>
        </View>
        <ScrollView bounces={false} style={styles.bodyContainer}>
          {answers.map((answer, i) => {
            return (
              <Input
                key={i}
                style={styles.input}
                autoCapitalize="none"
                returnKeyType="next"
                light={true}
                placeholder={`Word #${i + offset}`}
                value={answer}
                onChangeText={this.updateAnswer(i)}
              />
            );
          })}
          <View style={styles.footerContainer}>
            <Button
              type="primary"
              disabled={!completed}
              onPress={this.handleNextButton}
            >
              {LANG_NEXT_TEXT}
            </Button>
            <Button type="text" onPress={onCancel}>
              {LANG_CANCEL_TEXT}
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
    backgroundColor: "#223252"
  },
  headingStyle: {
    color: "#ffffff"
  },
  bodyContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 0
  },
  footerContainer: {
    padding: 20
  },
  input: {
    marginBottom: 20,
    flexDirection: "column"
  }
});
