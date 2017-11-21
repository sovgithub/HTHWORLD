import * as React from 'react';
import { Alert, Image, StatusBar, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Header from 'components/Header';
import {getColors, Colors} from 'styles';

const Referral: React.SFC<void> = () => {
  const themeColors = getColors();
  const themedStyles = getThemedStyles(getColors());

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        style={StyleSheet.flatten(styles.header)}
        textColor={themeColors.textPrimary}
        showSubtitle={false}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.textContent, styles.greeting, themedStyles.textContent]}>
          Fantastic work, Watson!
        </Text>
        <Text style={[styles.textContent, styles.placeInLine, themedStyles.textContent]}>
          There are currently <Text style={styles.bold}>4233,333</Text> people ahead of you.
          Skip the line by referring friends.
        </Text>
        <Text style={[styles.textContent, styles.referralLink, themedStyles.textContent]}>
          Your link: https://dev.hoardinvest.com
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  textContent: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  greeting: {
    fontSize: 20,
    paddingBottom: 30,
  },
  placeInLine: {
    fontSize: 20,
    paddingBottom: 30,
  },
  referralLink: {
    fontSize: 15,
  },
});

const getThemedStyles = (colors: Colors) => {
  return {
    textContent: {
      color: colors.textSecondary,
    },
  };
};

export default Referral;
