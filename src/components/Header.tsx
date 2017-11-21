import * as React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Logo from './Logo';
import {getColors, Colors} from 'styles';

interface Props {
  showSubtitle?: boolean;
  style?: any;
  textColor?: string;
}

const Header: React.SFC<Props> = (props) => {
  const themeColors = getColors();
  const themedStyles = getThemedStyles(themeColors);
  const fontStyle = { color: props.textColor || themeColors.textPrimary };

  return (
    <View style={[props.style, styles.contentContainer]}>
      <Logo />
      <Text style={[styles.header, themedStyles.header]}>Hoard</Text>
      { props.showSubtitle
        ? <Text style={[styles.subtitle, themedStyles.subtitle]}>Digital currency for everyone</Text>
        : null
      }
    </View>
  );
}

Header.defaultProps = {
  showSubtitle: true,
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
  },
  subtitle: {
    backgroundColor: 'transparent',
    fontSize: 20,
    fontWeight: '100',
    fontStyle: 'italic',
  },
});

const getThemedStyles = (colors: Colors) => {
  return {
    header: {
      color: colors.textPrimary,
    },
    subtitle: {
      color: colors.textPrimary,
    },
  };
};

export default Header;
