import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  PanResponder,
  StyleSheet,
  View
} from 'react-native';
import SVG, { Path } from 'react-native-svg';

import Button from 'components/Button';
import T from 'components/Typography';

const LANG_NEXT_TEXT = 'next';
const LANG_BACK_TEXT = 'back';

const MAX_DATA_POINTS = 150;
const SAMPLE_EVERY_X = 7;

export default class Entropy extends Component {
  static propTypes = {
    saveAndContinue: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  };

  state = {
    isRecording: false,
    movement: [],
    yOffset: 0,
    drawableHeight: 0,
    drawableWidth: 0
  };

  panResponder = null;

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => true,
      onPanResponderGrant: () => this.setState({ isRecording: true }),
      onPanResponderMove: (evt, gestureState) => this.setState({
        movement: [...this.state.movement, {...gestureState, time: Date.now()}]
      }),
      onPanResponderRelease: () => this.setState({ isRecording: false })
    });
  }

  handleLayout = ({ nativeEvent: { layout: { y, width, height } } }) => {
    this.setState({
      yOffset: y,
      drawableWidth: width ? width : Dimensions.get('window').width,
      drawableHeight: height,
    });
  };

  handleNextButton = () => {

    /* here we are grabbing all of the integer values from the movement data
     * that we are recording in the `onPanResponderMove` callback.
     *
     * this should include x/y positions, x/y velocities, and the timestamp
     * for each of those movements.
     *
     * we then strip out all non-integer values, so we can pass all of that
     * as hex data to our mnemonic phrase generator.
     */

    const str = this.state.movement.reduce(
      (accumulator, data, i) => {
        if (i % SAMPLE_EVERY_X === 0) {
          return accumulator + Object.values(data).join('');
        }
        return accumulator;
      },
      ''
    ).replace(/[^0-9]/g, '');

    this.props.saveAndContinue(`0x${str}`);
  }

  render() {
    const {drawableWidth, drawableHeight, movement, yOffset} = this.state;

    const percentageComplete = (movement.length / MAX_DATA_POINTS) * 100;
    const finished = percentageComplete === 100;

    let heading = 'Scribble around for a bit';
    if (finished) {
      heading = 'Finished!';
    } else if (movement.length) {
      heading = 'Keep Going...';
    }

    const path = movement.map((v, i) => {
      const verb = i === 0 ? 'M' : 'L';
      return `${verb}${parseInt(v.moveX)} ${parseInt(v.moveY - yOffset)}`;
    }).join(' ');

    const responders = finished ? {} : {...this.panResponder.panHandlers};

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <T.Heading style={styles.headingStyle}>{heading}</T.Heading>
        </View>
        <View onLayout={this.handleLayout} style={styles.container} {...responders}>
        {drawableWidth && drawableHeight && movement.length && (
          <SVG height={`${drawableHeight}`} width={`${drawableWidth}`}>
            <Path
              d={path}
              fill="none"
              stroke="#e6228d"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </SVG>
        )}
        </View>
        <View style={styles.footerContainer}>
          {finished
            ? (
              <Button type="primary" onPress={this.handleNextButton} >
                {LANG_NEXT_TEXT}
              </Button>
            )
            : (
              <View style={styles.percentageContainer}>
                <View style={[styles.percentageBar, {width: `${percentageComplete}%`}]}/>
              </View>
            )
          }
          <Button style={styles.backButton} type="text" onPress={this.props.goBack} >
            {LANG_BACK_TEXT}
          </Button>
        </View>
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
  footerContainer: {
    padding: 20
  },
  percentageContainer: {
    backgroundColor: 'white',
    height: 50,
  },
  percentageBar: {
    backgroundColor: `#e6228d`,
    height: 50
  },
  backButton: {
    marginTop: 20
  }
});
