export enum Theme {
  light = 'light',
  dark = 'dark'
}

export interface Colors {
  background: string;
  chartNegative: string;
  chartPositive: string;
  interactivePrimary: string;
  interactivePrimaryText: string;
  interactiveSecondary: string;
  interactiveSecondaryText: string;
  menu: string;
  textNegative: string;
  textPositive: string;
  textPrimary: string;
  textSecondary: string;
}

export const themeColors: {
  'light': Colors;
  'dark': Colors;
} = {
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
    textSecondary: '#526271'
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
    textSecondary: '#8D9FAE'
  }
}

let currentTheme: Theme = Theme.dark;

export function setTheme(theme: Theme): Theme {
  return currentTheme = theme;
}

export function getTheme(): Theme {
  return currentTheme;
}

export function getColors() {
  return themeColors[currentTheme];
}
