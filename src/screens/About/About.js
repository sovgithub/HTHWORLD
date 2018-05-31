import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import MenuHeader from 'components/MenuHeader';
import Link from 'components/Link';
import Scene from 'components/Scene';

export default function About() {
  return (
    <Scene preload={false}>
      <View style={styles.container}>
        <MenuHeader
          title="About"
          rightAction="menu"
        />
        <View style={styles.content}>
          <Link
            icon={require('assets/telegram.png')}
            title="Telegram"
            to="https://t.me/hoardinvest"
            external={true}
          />
          <Link
            icon={require('assets/blog.png')}
            title="Blog"
            to="https://blog.hoardinvest.com"
            external={true}
          />
          <Link
            icon={require('assets/twitter.png')}
            title="Twitter"
            to="https://twitter.com/hoardinvest"
            external={true}
          />
          <Link
            icon={require('assets/facebook.png')}
            title="Facebook"
            to="https://facebook.com/hoardinvest"
            external={true}
          />
          <Link
            icon={require('assets/linkedin.png')}
            title="LinkedIn"
            to="https://linkedin.com/company/hoardinvest"
            external={true}
          />
          <Link
            icon={require('assets/reddit.png')}
            title="Reddit"
            to="https://reddit.com/r/hoardinvest"
            external={true}
          />
          <Link
            icon={require('assets/thumbs_up.png')}
            title="Open Source Thanks"
            to="OpenSource"
          />
        </View>
      </View>
    </Scene>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 20
  },
});
