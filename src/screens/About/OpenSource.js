import React from 'react';
import { StyleSheet } from 'react-native';
import T from 'components/Typography';
import { Layout, Body } from 'components/Base';

export default function OpenSource() {
  return (
    <Layout preload={false} keyboard>
      <Body scrollable style={styles.body}>
        <Body>
          <T.Heading style={[styles.type, styles.header]}>
            We would like to thank:
          </T.Heading>
          <T.Paragraph style={styles.type}>
            Hoard, AltcoinCash, Devilking6105React, React Native, Ethers, 
            React Navigation, Redux, React Redux, Redux Saga, Reselect, 
            Victory Native, Lottie React Native, Prop Types, 
            React Native Animatable, React Native Config, React Native
            Contacts, React Native Linear Gradient, React Native Search Filter,
            React Native Splash Screen, React Native Svg, React Native
            Swipeable, React Native Touch Id, React Native Vector Icons, and
            many other Open Source contributors.
          </T.Paragraph>
        </Body>
      </Body>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginVertical: 35,
  },
  body: {
    padding: 20,
  },
  type: {
    color: 'white',
    lineHeight: 26,
  },
});
