/*
*
*  Style
*
* Usage:
*
* // in some component
* import styles from 'styles/index.js'
* <View style={styles.container} />
*/

import {StyleSheet, Dimensions} from 'react-native'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}

export const colors  = {
  primary: '#226B74',
  secondary: '#254B5A',
  tertiary: '#5DA6A7'
}

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40
}

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
  primary: 'Cochin'
}




// added below our colors, fonts, padding etc
// base styles
const baseStyles = {
  container: {
    paddingHorizontal: padding.sm,
    paddingVertical: padding.lg,
    width: dimensions.fullWidth
  },
  header: {
    backgroundColor: 'transparent',
    fontSize: fonts.lg,
    fontFamily: fonts.primary,
    fontWeight: 'bold'
  },
  section: {
    paddingVertical: padding.lg,
    paddingHorizontal: padding.xl
  },
}

export default function createStyles(overrides = {}) {
  return StyleSheet.create({...baseStyles, ...overrides})
}




export const Theme = {
  light: 'light',
  dark: 'dark',
};

export const themeColors = {
  [Theme.light]: {
    background: '#FFFFFF',
    chartNegative: '#C30072',
    chartPositive: '#21FF78',
    interactivePrimary: '#33BD5A',
    interactivePrimaryText: '#FFFFFF',
    interactiveSecondary: '#2DA64E',
    interactiveSecondaryText: '#FFFFFF',
    menu: '#3B4D5E',
    textNegative: '#C30072',
    textPositive: '#4EBE70',
    textPrimary: '#27323D',
    textSecondary: '#526271',
  },
  [Theme.dark]: {
    background: '#171D2B',
    chartNegative: '#C30072',
    chartPositive: '#21FF78',
    interactivePrimary: '#1BB443',
    interactivePrimaryText: '#FFFFFF',
    interactiveSecondary: '#1B923D',
    interactiveSecondaryText: '#FFFFFF',
    menu: '#FFFFFF',
    textNegative: '#CF0044',
    textPositive: '#1EDC6B',
    textPrimary: '#FFFFFF',
    textSecondary: '#8D9FAE',
  },
};

let currentTheme = Theme.dark;

export function setTheme(theme) {
  return (currentTheme = theme);
}

export function getTheme() {
  return currentTheme;
}

export function getColors() {
  return themeColors[currentTheme];
}
