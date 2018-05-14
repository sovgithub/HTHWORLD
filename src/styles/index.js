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

import { StyleSheet, Dimensions } from 'react-native';

export const Theme = {
  light: 'light',
  dark: 'dark',
};

// Colors
export const colors = {
  white: '#ffffff', // rgba(255, 255, 255, 1)
  grayLighter: '#dedfe5', // rgba(222, 223, 229, 1)
  grayLight: '#8c8fa5', // rgba(140, 143, 165, 1)
  gray: '#5f627d', // rgba(95, 98, 125, 1)
  grayDark: '#313347', // rgba(49, 51, 71, 1)
  grayDarker: '#17181e', // rgba(23, 24, 30, 1)
  black: '#000000', // rgba(0, 0, 0, 1)

  pinkDark: '#e6228d', // rgba(230, 34, 141, 1)
  violet: '#992fee', // rgba(153, 47, 238, 1)
  greenLighter: '#00EC9E', //rgb(0, 236, 158)
  greenLight: '#00a073', // rgba(0, 160, 115, 1)
  greenBlue: '#007982', // rgba(0, 121, 130, 1)
};

export const gradients = {
  green: [colors.greenLight, colors.greenBlue],
  blue: [colors.grayDark, colors.grayDarker],
  pink: [colors.violet, colors.pinkDark],
  light: [colors.grayLighter, colors.grayLight],
  horizontal: {
    start: { x: 0, y: 1 },
    end: { x: 1, y: 1 },
  },
  vertical: {
    start: { x: 1, y: 1 },
    end: { x: 1, y: 0 },
  },
  topLeft: {
    start: { x: 0.0, y: 0.1 },
    end: { x: 0.1, y: 1.0 },
  },
};

// Typography
export const typography = {
  size: {
    sm: 12,
    normal: 14,
    md: 18,
    lg: 28,
    xl: 32,
    xxl: 44,
  },
  lineHeight: {
    sm: 18,
    normal: 20,
    md: 26,
    lg: 32,
  },
  letterSpacing: {
    sm: -1,
    normal: 0,
    md: 1,
    lg: 1.5,
  },
  weight: {
    thin: '100',
    light: '200',
    normal: '400',
    semibold: '600',
    bold: '800',
  },
  family: {
    serif: 'Cochin',
    sans: 'HelveticaNeue',
    primary: 'HelveticaNeue',
  },
};

// Layout & Dimensions
export const dimensions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

const baseStyles = {
  container: {
    paddingHorizontal: padding.sm,
    paddingVertical: padding.lg,
    width: dimensions.fullWidth,
  },
  header: {
    backgroundColor: 'transparent',
    fontSize: typography.size.lg,
    fontFamily: typography.family.primary,
    fontWeight: typography.weight.semibold,
  },
  text: {
    fontSize: typography.size.lg,
    fontFamily: typography.family.primary,
    fontWeight: typography.weight.light,
    letterSpacing: 1.5,
  },
  section: {
    paddingVertical: padding.sm,
    paddingHorizontal: padding.sm,
  },
};

/*
   Create Styles

   Usage:

   // import exported styles & methods
   import createStyles, {typography, colors} from '../../styles/base.js'

  // override default styles
  const panelStyles = createStyles({
    section: {
      fontSize: typography.md,
      color: colors.secondary
    }
  })

  // use new overridden
  <View style={panelStyles.section}>...</View>
 */
export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...baseStyles, ...overrides });
}

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
  Stylesheet.create();
  return (currentTheme = theme);
}

export function getTheme() {
  return currentTheme;
}

export function getColors() {
  return themeColors[currentTheme];
}
