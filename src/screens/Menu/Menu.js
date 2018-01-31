/**
 * Custom Drawer Menu
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { unsetUser } from 'screens/User/actions';
import { getColors } from 'styles';
import Animations, { FADE, SLIDE_X } from '../../hocs/Animations';

class Menu extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    unsetUser: PropTypes.func.isRequired
  };

  state = {
    focused: false,
    startAnimation: false,
    exitAnimation: false
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener(
      'didBlur',
      this.handleMenuOpened
    );
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  handleMenuOpened = () => {
    this.setState({
      startAnimation: true,
      exitAnimation: false
    });
  };

  onAnimationComplete = () => {
    this.setState({ startAnimation: false, exitAnimation: false });
  };

  navigateTo = route => {
    this.setState(
      { startAnimation: false, exitAnimation: true },

      () => {
        //eslint-disable-next-line no-undef
        setTimeout(() => this.props.navigation.navigate(route), 100);
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageView}
          imageStyle={styles.image}
          source={
            require('assets/BackgroundBlue.png') // eslint-disable-line no-undef
          }
        >
          <ScrollView style={{ paddingTop: 40 }}>
            <View style={{ backgroundColor: 'transparent', flex: 1 }}>
              <View style={{ alignSelf: 'flex-end' }}>
                <Button
                  title="X"
                  onPress={() => this.navigateTo('DrawerClose')}
                  color={
                    getColors().menu // eslint-disable-line react/prop-types
                  }
                />
              </View>

              <Animations
                animations={[
                  { type: FADE, parameters: { start: 0, end: 1 } },
                  { type: SLIDE_X, parameters: { start: 1000, end: 0 } }
                ]}
                enterDelay={0}
                enterDuration={500}
                enterStagger={150}
                exitDelay={0}
                exitDuration={100}
                exitStagger={30}
                startAnimation={this.state.startAnimation}
                exitAnimation={this.state.exitAnimation}
              >
                <TouchableOpacity
                  style={styles.linkWrapper}
                  onPress={() => this.navigateTo('Wallet')}
                >
                  <Text style={styles.linkContent}>Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.linkWrapper}
                  onPress={() => this.navigateTo('Dashboard')}
                >
                  <Text style={styles.linkContent}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.linkWrapper}
                  onPress={() => this.navigateTo('Settings')}
                >
                  <Text style={styles.linkContent}>Settings</Text>
                </TouchableOpacity>
              </Animations>
            </View>
          </ScrollView>
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.unsetUser()}
            >
              <Text style={styles.buttonText}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { unsetUser })(Menu);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footerContainer: {
    padding: 20
  },
  imageView: {
    flex: 1
  },
  image: {
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  buttonContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#223252',
    fontWeight: '700'
  },
  linkWrapper: {
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: 20
  },
  linkContent: {
    color: '#ffffff',
    fontWeight: '700',
    padding: 10,
    backgroundColor: 'transparent',
    alignSelf: 'center'
  }
});
