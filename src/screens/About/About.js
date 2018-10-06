import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Link from 'components/Link';
import { Layout } from 'components/Base';

export default class About extends Component {
  render() {
    return (
      <Layout preload={false}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Link
              icon={require('assets/telegram.png')}
              title="Discord"
              to="https://discord.gg/jmuJqCv"
              external={true}
            />
            <Link
              icon={require('assets/twitter.png')}
              title="Twitter"
              to="https://twitter.com/hthcoin"
              external={true}
            />
            <Link
              icon={require('assets/facebook.png')}
              title="Facebook"
              to="https://facebook.com/hth_coin_9"
              external={true}
            />
            <Link
              icon={require('assets/linkedin.png')}
              title="HTH Wiki"
              to="https://hthcoin.wiki/index.php/Main_Page"
              external={true}
            />
            <Link
              icon={require('assets/reddit.png')}
              title="Help The Homeless Worldwide"
              to="https://helpthehomelessworldwide.org"
              external={true}
            />
            <Link
              icon={require('assets/thumbs_up.png')}
              title="Open Source Thanks"
              to="OpenSource"
            />
            <Link
              title="Release Notes"
              to="ReleaseNotes"
            />
          </View>
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
});
