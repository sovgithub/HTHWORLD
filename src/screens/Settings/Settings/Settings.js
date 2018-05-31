import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
} from 'react-native';

import { Layout, Body, Header } from 'components/Layout';
import MenuHeader from 'components/MenuHeader';
import Link from 'components/Link';
import T from 'components/Typography';

export default function Settings({selectedTradingPair}) {
  return (
    <Layout preload={false}>
      <Header>
        <MenuHeader
          title="Settings"
          rightAction="menu"
        />
      </Header>
      <Body scrollable style={styles.content}>
        <Link
          title="Display Currency"
          to="DisplayCurrency"
          arrowOverride={(
            <T.Light style={{color: 'white'}}>{selectedTradingPair}</T.Light>
          )}
        />
      </Body>
    </Layout>
  );
}

Settings.propTypes = {
  selectedTradingPair: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 20
  },
});
