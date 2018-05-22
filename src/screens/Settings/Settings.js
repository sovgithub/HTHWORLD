import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import MenuHeader from 'components/MenuHeader';
import Link from 'components/Link';
import Scene from 'components/Scene';

export default function Settings() {
  return (
    <Scene preload={false}>
      <View style={styles.container}>
        <MenuHeader
          title="Settings"
          rightAction="menu"
        />
        <View style={styles.content}>
          <Link title="SOME LINKS" to="SOME ROUTE" />
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
