import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Dimensions,
  PanResponder,
  StyleSheet,
  Image,
  View
} from 'react-native';
import SVG, { Path, Circle } from 'react-native-svg';

import {CircularProgress} from 'react-native-svg-circular-progress';

import Button from 'components/Button';
import T from 'components/Typography';
import MenuHeader from 'components/MenuHeader';

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

    let progressText = '';
    if (finished) {
      progressText = 'Finished';
    } else if (movement.length) {
      progressText = 'Keep Going...';
    }


    const path = movement.map((v, i) => {
      const verb = i === 0 ? 'M' : 'L';
      return `${verb}${parseInt(v.moveX)} ${parseInt(v.moveY - yOffset)}`;
    }).join(' ');

    const responders = finished ? {} : {...this.panResponder.panHandlers};

    return (
      <View style={styles.container}>
        <MenuHeader
          leftAction={(
            <TouchableOpacity onPress={this.props.goBack}>
              <Image source={require('assets/closeicon.png')} />
            </TouchableOpacity>
          )}
          title="Scribble"
        />
        <View onLayout={this.handleLayout} style={[styles.container, styles.drawBox]} {...responders}>
          {(drawableWidth && drawableHeight && movement.length)
          ? (
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
          )
          : (
            <View style={{alignItems: 'center'}}>
              <Image
                style={{resizeMode: 'contain', opacity: 0.4}}
                source={require('assets/scribble.png')}
              />
              <T.Heading style={{
                color: "#3E434B",
                marginTop: 20,
              }}>
                Scribble around for a bit
              </T.Heading>
            </View>
          )
        }
        </View>
        <View style={styles.footerContainer}>
          {finished
            ? (
              <View style={{}}>
                <T.Heading style={{textAlign: 'center', color: 'white', marginBottom: 20}}>{progressText}</T.Heading>
                <Button onPress={this.handleNextButton} >
                  {LANG_NEXT_TEXT}
                </Button>
              </View>
            )
            : (
              <View style={{alignItems: 'center'}}>
                <CircularProgress
                  percentage={percentageComplete}
                  blankColor="rgba(151, 151, 151, 0.3)"
                  donutColor="#e6228d"
                  progressWidth="46"
                  fillColor="#1b1c23"
                  size={100}
                >
                  <T.Light style={{textAlign: 'center', color: 'white', fontSize: 24, fontWeight: '400'}}>{parseInt(percentageComplete)}%</T.Light>
                </CircularProgress>
                <T.Heading style={{color: 'white', marginTop: 20}}>{progressText}</T.Heading>
              </View>
            )
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawBox: {
    flex: 2,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3E434B',
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
    flex: 1,
    padding: 20
  },
});
