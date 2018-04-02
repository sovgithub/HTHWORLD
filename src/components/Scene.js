import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native-animatable';
import Icon from 'components/Icon';
import { InteractionManager, StyleSheet } from 'react-native';

export default class Scene extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    delay: PropTypes.number,
    duration: PropTypes.number,
  };

  static defaultProps = {
    delay: 2000,
    duration: 750,
  };

  state = {
    isReady: false,
    hasFaded: false,
  };

  handleAnimatingViewRef = ref => (this.animatedView = ref);
  handleAnimatingLoadingRef = ref => (this.animatedLoading = ref);

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.handleLoadingFinished();
    });
  }

  handleLoadingFinished = () => {
    this.setState({ isReady: true }, () => {
      //eslint-disable-next-line no-undef
      setTimeout(() => {
        this.handleAnimations();
      }, this.props.delay);
    });
  };

  handleAnimations = () => {
    this.animatedLoading.fadeOutDown(250);
    this.animatedView
      .fadeOut(this.props.duration)
      .then(() => this.setState({ hasFaded: true }));
  };

  renderLoader() {
    return (
      <View
        animation="rotate"
        duration={750}
        easing="ease-in-out-circ"
        iterationCount="infinite"
        style={{
          height: 40,
          width: 40,
          alignItems: 'center',
        }}
      >
        <Icon icon="ios-ionic" style={{ position: 'absolute' }} />
      </View>
    );
  }
  render() {
    const { hasFaded, isReady } = this.state;
    return (
      <View style={[styles.container, { backgroundColor: 'red' }]}>
        {!hasFaded && (
          <View
            ref={this.handleAnimatingViewRef}
            style={styles.loadingContainer}
          >
            <View ref={this.handleAnimatingLoadingRef}>
              {this.renderLoader()}
            </View>
          </View>
        )}
        {isReady && this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  loadingContainer: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#1B273F',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 20,
  },
});
