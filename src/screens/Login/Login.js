import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Config from 'react-native-config';
import LoginForm from './LoginForm';
import withDismissableKeyboard from 'hocs/withDismissableKeyboard';
import T from 'components/Typography';
import createStyles, { colors, gradients, fonts} from 'styles';
import LinearGradient from 'react-native-linear-gradient';

const DismissableView = withDismissableKeyboard(View);

const styless = createStyles()

const customStyles = createStyles({
  header: {
    fontSize: fonts.size.lg,
    color: colors.darkPink
  }
})


export default class Login extends React.Component {
  static propTypes = {
    navigation: PropTypes.any,
    loginRequest: PropTypes.func.isRequired,
    login: PropTypes.shape({
      errors: PropTypes.arrayOf(PropTypes.object),
    }),
  };

  render(){
    return(
    <View style={styless.container}>
      <Text style={customStyles.header}>Custom</Text>
      <Text style={[styless.header, {color: colors.white}]}>White</Text>
      <Text style={{color: colors.grayLighter}}>GRAYLIGHTER</Text>
      <Text style={{color: colors.grayLight}}>GRAYLIGHT</Text>
      <Text style={{color: colors.gray}}>GRAY</Text>
      <Text style={{color: colors.grayDark}}>GRAYDARK</Text>
      <Text style={{color: colors.grayDarker}}>GRAYDARKER</Text>
      <Text style={{color: colors.black}}>BLACK</Text>

      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={gradients.blue}
        style={styless.section}
      >
        <Text style={{color: colors.black}}>BLACK</Text>

      </LinearGradient>

    </View>
    )
  }
  // render() {
  //   return (
  //     <KeyboardAvoidingView
  //       imageStyle={styles.image}
  //       behavior="padding"
  //       style={styles.container}
  //     >
  //       <DismissableView style={styles.container}>
  //         <StatusBar barStyle="light-content" />
  //         <ImageBackground
  //           style={styles.imageView}
  //           imageStyle={styles.image}
  //           source={require('assets/BackgroundBlue.png')} // eslint-disable-line no-undef
  //         >
  //           <View style={styles.logoContainer}>
  //             <Image
  //               style={styles.logo}
  //               source={require('assets/HoardLogoWhite.png')} // eslint-disable-line no-undef
  //             />
  //             <View><Text style={styles.title}>Log In</Text></View>
  //           </View>
  //           { __DEV__ && (
  //             <View>
  //               <T.Small style={styles.network}>{`Using: ${Config.ETHNET.toUpperCase()}`}</T.Small>
  //             </View>
  //           )}
  //           <View style={styles.formContainer}>
  //             <LoginForm
  //               navigation={this.props.navigation}
  //               loginRequest={this.props.loginRequest}
  //               errors={this.props.login.errors}
  //             />
  //           </View>
  //         </ImageBackground>
  //       </DismissableView>
  //     </KeyboardAvoidingView>
  //   );
  // }
}

const styles = StyleSheet.create({
  containerz: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerGradient: {
    borderRadius: 0,
  },

  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginTop: 10,
    marginRight: 10,
  },
  title: {
    color: '#fff',
    marginTop: 10,
    fontSize: 40,
    fontWeight: '100',
    textAlign: 'center',
  },
  network: {
    color: '#fff',
    textAlign: 'center',
  },
  imageView: {
    flex: 1,
    paddingTop: 40,
  },
  image: {
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  formContainer: {
    marginBottom: 10,
  },
});
