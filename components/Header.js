// @flow
import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Logo from './Logo';

type Props = {
  showSubtitle?: boolean,
  style?: any,
  textColor?: string
};

export default function Header(props: Props) {
  const fontStyle = { color: props.textColor };

  return (
    <View style={[props.style, styles.contentContainer]}>
      <Logo />
      <Text style={[styles.header, fontStyle]}>Hoard</Text>
      { props.showSubtitle
        ? <Text style={[styles.subtitle, fontStyle]}>Digital currency for everyone</Text>
        : null
      }
    </View>
  );
}

Header.defaultProps = {
  showSubtitle: true,
  textColor: 'white'
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'transparent',
    fontSize: 70,
    fontWeight: '100',
    color: 'white',
  },
  subtitle: {
    backgroundColor: 'transparent',
    fontSize: 20,
    fontWeight: '100',
    fontStyle: 'italic',
    color: 'white',
  },
});
