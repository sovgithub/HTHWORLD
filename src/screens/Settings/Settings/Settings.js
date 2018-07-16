import React from 'react';
import { StyleSheet } from 'react-native';

import { Layout, Body } from 'components/Base';
import Link from 'components/Link';

export default function Settings() {
  return (
    <Layout preload={false}>
      <Body scrollable style={styles.content}>
        <Link
          title="Seed Words"
          to="SeedWords"
        />
      </Body>
    </Layout>
  );
}

Settings.propTypes = {
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
});
