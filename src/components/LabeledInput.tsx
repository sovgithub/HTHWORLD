import * as React from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';
import {getColors} from 'styles';

interface Props {
  activeColor: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  inactiveColor: string;
  placeholder?: string;
  style?: {[key: string]: any};
  value?: string;
  onChangeText: () => any;
  onSubmitEditing: () => any;
}

interface State {
  active: boolean
}

export default class LabeledInput extends React.Component<Props, State> {
  state: State = { active: false }

  inputRef: any = null
  setupInputRef = (input: any) => this.inputRef = input

  toggleFocus = () => this.setState({ active: !this.state.active })

  render() {
    const {
      activeColor,
      autoCapitalize,
      inactiveColor,
      placeholder,
      style,
      value,
      onChangeText,
      onSubmitEditing
    } = this.props;

    const color = this.state.active ? activeColor : inactiveColor;

    return (
      <TextInput
        style={[
          styles.textInput,
          {
            borderBottomColor: color,
            color
          },
          style
        ]}
        value={value}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={this.toggleFocus}
        onBlur={this.toggleFocus}
        ref={this.setupInputRef}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    height: 50,
    textAlign: 'center',
  },
});
