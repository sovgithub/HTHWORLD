/*
  Usage:

  export const ENTRIES = [
    {
      title: 'My Balance',
      amount: '$86,753.09',
      change: '+5.65',
      colors: ['#129161', '#0C6169'],
    },
    {
      title: 'My Balance',
      amount: '$86,753.09',
      change: '+5.65',
      colors: ['#A55324', '#AE2282'],
    },
    {
      title: 'My Balance',
      amount: '$86,753.09',
      change: '+5.65',
      colors: ['#0C6169', '#129161'],
    },
  ];

  {ENTRIES.map(item => (
    <Card
      title={item.title}
      amount={item.amount}
      change={item.change}
      colors={item.colors}
    />
  ))}

 */
import React, { Component } from 'react';
import PropTypes, { string, object } from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

function calcWidth(percentage) {
  const value = percentage * viewportWidth / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = calcWidth(75);
const itemHorizontalMargin = calcWidth(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
export const cardWidth = itemWidth;
export const cardHeight = slideWidth * 1.618 * 0.4;

export default class Card extends Component {
  static propTypes = {
    title: string.isRequired,
    amount: string.isRequired,
    change: string.isRequired,
    colors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  };

  static defaultProps = {
    title: 'Default Asset',
    amount: '$45,524.92',
    change: '5.24%',
    colors: '#0F716A',
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
    this.depthInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 60, 180],
      outputRange: [1, 1.25, 1],
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0],
    });
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1],
    });
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 4,
        tension: 5,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 4,
        tension: 5,
      }).start();
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate },
        { scaleY: this.depthInterpolate },
      ],
    };
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate },
        { scaleY: this.depthInterpolate },
      ],
    };

    const frontColors = this.props.colors;
    const backColors = [...frontColors].reverse();

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.flipCard()}
      >
        <View>
          <Animated.View
            style={[
              styles.flipCard,
              frontAnimatedStyle,
              { opacity: this.frontOpacity },
            ]}
          >
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              colors={frontColors}
              style={[
                styles.card,
                styles.cardContent,
                styles.cardGradient,
                this.props.cardStyle,
              ]}
            >
              <View style={styles.cardLeft}>
                <Text style={(styles.flipText, styles.subHeading)}>
                  {this.props.title}
                </Text>
                <Text style={(styles.flipText, styles.heading)}>
                  {this.props.amount}
                </Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={(styles.flipText, styles.status)}>
                  {this.props.change}
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>

          <Animated.View
            style={[
              backAnimatedStyle,
              styles.flipCard,
              styles.flipCardBack,
              { opacity: this.backOpacity },
            ]}
          >
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              colors={backColors}
              style={[styles.card, styles.cardGradient, this.props.cardStyle]}
            >
              <Text style={(styles.flipText, styles.subHeading)}>
                Transactions: 500
              </Text>
              <Text style={(styles.flipText, styles.subHeading)}>
                Pending: 2
              </Text>
            </LinearGradient>
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 20,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardGradient: {
    borderRadius: 20,
  },
  flipCard: {
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  flipText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  cardLeft: {
    flexGrow: 1,
  },
  heading: {
    fontFamily: 'HelveticaNeue',
    fontSize: 40,
    fontWeight: '800',
    fontStyle: 'normal',
    letterSpacing: 0.75,
    color: 'rgb(255, 255, 255)',
  },
  subHeading: {
    fontFamily: 'HelveticaNeue',
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.75,
    color: 'rgb(255, 255, 255)',
  },
  status: {
    fontFamily: 'HelveticaNeue',
    fontSize: 16,
    fontWeight: '200',
    fontStyle: 'normal',
    letterSpacing: 0.75,
    color: 'rgb(255, 255, 255)',
  },
});
