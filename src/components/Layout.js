/**
 * Layout.js
 *
 * Description:
 * Components that provide consistent layout behavior for screens, views, and
 * sections of content throughout the application. Based on flexbox.
 *
 *
 * Usage:
 * <Layout/> fills screen, flexes children, no scrolling, controls loading view
 * <Body/> nestable view, scrolls content
 * <[Header|Body|Footer]> generic content views with special styling/layout
 *
 * Example - fixed header and footer, only body is scrollable:
 * <Layout preload={false}>
 *   <Header> - Fixed to top
 *   <Body scrollable bounces={false}> -- scrollable body
 *     <Header />  -- scrolls in parent
 *     <Body /> --
 *     <Footer />
 *   <Body>
 *   <Footer> - Fixed to Bottom
 * </Layout>
 *
 *
 * Example - all content is scrollable:
 * <Layout preload={false}>
 *   <Body scrollable bounces={true}>
 *     <Header>
 *       <Body>
 *         <Header />
 *         <Body />
 *         <Footer />
 *       <Body>
 *     <Footer>
 *   </Body>
 * </Layout>
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View as AnimatedView } from 'react-native-animatable';
import _ from 'lodash';
import Icon from 'components/Icon';
import {
  InteractionManager,
  ScrollView,
  StyleSheet,
  View,
  ViewPropTypes,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

export const Header = ({ style, children, ...otherProps }) => (
  <View style={[styles.header, style]} {...otherProps}>
    {children}
  </View>
);
Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: ViewPropTypes.style,
};

export const Body = ({ style, children, ...otherProps }) => {
  if (otherProps.scrollable) {
    const dismissKeyboard = otherProps.dismissKeyboard;
    const dismissMode = Platform.OS === 'ios' ? 'on-drag' : 'none';
    return (
      <ScrollView
        bounces={otherProps.bounces}
        style={[styles.body, style]}
        keyboardShouldPersistTaps={dismissKeyboard}
        keyboardDismissMode={dismissMode}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
    );
  } else {
    return (
      <View style={[styles.body, style]} {...otherProps}>
        {children}
      </View>
    );
  }
};

export const Footer = ({ style, children, ...otherProps }) => {
  const stylesFromProps = {
    ...(otherProps.push && {
      marginTop: 'auto',
    }),
  };
  return (
    <View style={[styles.footer, stylesFromProps, style]} {...otherProps}>
      {children}
    </View>
  );
};
Footer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: ViewPropTypes.style,
};

export class Layout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    delay: PropTypes.number,
    duration: PropTypes.number,
    preload: PropTypes.bool,
    withHeader: PropTypes.bool,
    keyboard: PropTypes.bool,
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    delay: 0,
    duration: 750,
    preload: true,
    withHeader: true,
    keyboard: false,
  };

  state = {
    isReady: false,
    hasFaded: false,
  };

  handleAnimatingViewRef = ref => (this.animatedView = ref);
  handleAnimatingLoadingRef = ref => (this.animatedLoading = ref);
  handleBodyRef = ref => (this.animatedBody = ref);

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
    _.invoke(this, 'animatedLoading.fadeOutDown', 250);

    if (_.has(this, 'animatedView.fadeOut')) {
      this.animatedView.fadeOut(this.props.duration).then(() => {
        this.setState({ hasFaded: true });
      });

      // Animate the content in as view is fading out
      setTimeout(() => {
        this.animatedBody.fadeIn();
      }, 100);
    }
  };

  renderLoader() {
    return (
      <AnimatedView
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
      </AnimatedView>
    );
  }

  renderContent = () => {
    if (this.props.keyboard) {
      return (
        <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardView}>
          <StatusBar barStyle="light-content" />
          <View style={[styles.layout, this.props.style]} {...this.props}>
            {this.props.children}
          </View>
        </KeyboardAvoidingView>
      );
    } else {
      return (
        <View style={[styles.layout, this.props.style]} {...this.props}>
          <StatusBar barStyle="light-content" />
          {this.props.children}
        </View>
      );
    }
  };

  render() {
    const { hasFaded, isReady } = this.state;
    // Only try and preload if necessary
    if (this.props.preload) {
      return (
        <View style={[styles.layout, this.props.style]} {...this.props}>
          {!hasFaded && (
            <AnimatedView
              ref={this.handleAnimatingViewRef}
              style={styles.loadingContainer}
            >
              <AnimatedView ref={this.handleAnimatingLoadingRef}>
                {this.renderLoader()}
              </AnimatedView>
            </AnimatedView>
          )}
          {isReady && (
            <AnimatedView
              ref={this.handleBodyRef}
              style={{
                opacity: 0,
                flex: 1,
              }}
            >
              {this.renderContent()}
            </AnimatedView>
          )}
        </View>
      );
    }
    // If no preload, just return the view
    else {
      return this.renderContent();
    }
  }
}

const styles = StyleSheet.create({
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
  keyboardView: {
    flex: 1,
  },
  layout: {
    flex: 1,
  },
  header: {},
  body: {
    flex: 1,
  },
  footer: { marginBottom: 20 },
});
