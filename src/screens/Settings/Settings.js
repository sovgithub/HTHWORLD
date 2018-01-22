import * as React from 'react';
import { TouchableOpacity, Button, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import styles from './style';

class Settings extends React.Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    birthday: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  };

  updateFormField = fieldName => text => {
    this.setState({ [fieldName]: text });
  };

  submitForm = () => {
    console.log(this.state);
    this.props.navigation.navigate('Dashboard');
  };

  render() {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 0;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={keyboardVerticalOffset}
        behavior={Platform.OS === 'ios' ? 'padding' : null }
      >
      <ScrollView>
          <TextInput
            placeholder="First Name"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={this.updateFormField('firstName')}
          />
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={this.updateFormField('lastName')}
          />
          <TextInput
            placeholder="Date of Birth: yyyy-mm-dd"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={this.updateFormField('birthday')}
          />
          <TextInput
            placeholder="Street Address"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={this.updateFormField('streetAddress')}
          />
          <TextInput
            placeholder="City"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={this.updateFormField('city')}
          />
          <TextInput
            placeholder="State"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={this.updateFormField('state')}
          />
          <TextInput
            placeholder="Postal Code"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={this.updateFormField('postalCode')}
          />
          <TextInput
            placeholder="Country"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={this.updateFormField('country')}
          />
          <TouchableOpacity style={styles.button}>
            <Button style={styles.buttonText} onPress={this.submitForm} title="Save Settings"/>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default Settings;
