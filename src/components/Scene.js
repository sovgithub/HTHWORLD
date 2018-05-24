import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native-animatable';
import Icon from 'components/Icon';
import LinearGradient from 'react-native-linear-gradient';
import { gradients } from 'styles';
import { InteractionManager, StyleSheet } from 'react-native';
import withDismissableKeyboard from 'hocs/withDismissableKeyboard';

const DismissableView = withDismissableKeyboard(View);
export default class Scene extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    delay: PropTypes.number,
    duration: PropTypes.number,
    preload: PropTypes.bool,
    withHeader: PropTypes.bool,
  };

  static defaultProps = {
    delay: 2000,
    duration: 750,
    preload: true,
    withHeader: true,
  };

  state = {
    isReady: false,
    hasFaded: false,
  };

  handleAnimatingViewRef = ref => (this.animatedView = ref);
  handleAnimatingLoadingRef = ref => (this.animatedLoading = ref);

  componentDidMount() {
    if (!this.props.preload) {
      this.setState({ hasFaded: true, isReady: true });
      return;
    }
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
    const containerStyle = this.props.withHeader ? { paddingTop: 0 } : {};
    const { hasFaded, isReady } = this.state;
    return (
      <DismissableView style={[styles.container, ...containerStyle]}>
        {!hasFaded && (
          <View
            ref={this.handleAnimatingViewRef}
            style={styles.loadingContainer}
          >
            <LinearGradient
                start={gradients.vertical.start}
                end={gradients.vertical.end}
                colors={gradients.light}
                style={styles.loadingContainer}
              >
                <View ref={this.handleAnimatingLoadingRef}>
                  {this.renderLoader()}
                </View>
            </LinearGradient>
          </View>
        )}
        {isReady && this.props.children}
      </DismissableView>
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
    paddingTop: 65,
  },
  loadingContainer: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'transparent',
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
