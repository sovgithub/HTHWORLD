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
