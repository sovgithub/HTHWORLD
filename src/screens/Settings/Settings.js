import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  StyleSheet
} from 'react-native';
import Input from 'components/Input';
import Button from 'components/Button';
import T from 'components/Typography';
import withDismissableKeyboard from "hocs/withDismissableKeyboard";

const DismissableView = withDismissableKeyboard(View);

class Settings extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    email_address: '',
    first_name: '',
    last_name: '',
    birthdate: '',
    street_address: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  };

  updateFormField = fieldName => text => {
    this.setState({ [fieldName]: text });
  };

  submitForm = () => {
    console.log(this.state); // eslint-disable-line no-console
    this.props.navigation.navigate('Dashboard');
  };

  render() {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0;
    const LANG_HEADING_TEXT = "Let's Get Started!";
    const LANG_MAIN_TEXT =
      "In to participate in the Hoard ICO event, we'll need to verify your personal information.";

    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.container}
      >
        <ImageBackground
          style={styles.imageView}
          imageStyle={styles.image}
          source={require('assets/BackgroundBlue.png')}
        >
          <ScrollView>
            <DismissableView style={styles.formContainer}>
              <View>
                <T.Heading style={styles.heading}>{LANG_HEADING_TEXT}</T.Heading>
                <T.Light style={styles.text}>{LANG_MAIN_TEXT}</T.Light>
                <T.Small style={styles.notification}>
                  Please note, care about your privacy! Your personal
                  information is never sent to or seen by us. This information
                  is stored locally and is only transmitted once to our
                  compliance authorization service.To learn more about these
                  privacy policies, click here.
                </T.Small>
              </View>
              <Input
                autoCapitalize="none"
                placeholder="Email Address"
                value={this.state.email_address}
                onChangeText={this.updateFormField('email_address')}
                style={styles.input}
              />
              <Input
                autoCapitalize="words"
                placeholder="First Name"
                value={this.state.first_name}
                onChangeText={this.updateFormField('first_name')}
                style={styles.input}
              />
              <Input
                autoCapitalize="words"
                placeholder="Last Name"
                value={this.state.last_name}
                onChangeText={this.updateFormField('last_name')}
                style={styles.input}
              />
              <Input
                autoCapitalize="none"
                placeholder="Birthdate"
                value={this.state.birthdate}
                onChangeText={this.updateFormField('birthdate')}
                style={styles.input}
              />
              <Input
                autoCapitalize="words"
                placeholder="Street Address"
                value={this.state.street_address}
                onChangeText={this.updateFormField('street_address')}
                style={styles.input}
              />
              <Input
                autoCapitalize="words"
                placeholder="City"
                value={this.state.city}
                onChangeText={this.updateFormField('city')}
                style={styles.input}
              />
              <Input
                autoCapitalize="words"
                placeholder="State"
                value={this.state.state}
                onChangeText={this.updateFormField('state')}
                style={styles.input}
              />
              <Input
                autoCapitalize="words"
                placeholder="Postal Code"
                value={this.state.postal_code}
                onChangeText={this.updateFormField('postal_code')}
                style={styles.input}
              />
              <Input
                autoCapitalize="words"
                placeholder="Country"
                value={this.state.country}
                onChangeText={this.updateFormField('country')}
                style={styles.input}
              />
              <Button onPress={this.submitForm} style={styles.button} type="primary">
                Save Settings
              </Button>
            </DismissableView>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1
  },
  image: {
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  heading: {
    backgroundColor: 'transparent',
    color: '#ffffff'
  },
  text: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    marginBottom: 10
  },
  notification: {
    backgroundColor: '#FDE3A7',
    color: '#F89406',
    fontStyle: 'italic',
    padding: 20,
    marginBottom: 20,
  },
  formContainer: {
    padding: 20
  },
  input: {
    marginBottom: 10
  },
  button: {
    marginTop: 20
  },
  imageView: {
    flex: 1
  }
});
