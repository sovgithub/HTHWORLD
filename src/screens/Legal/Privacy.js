import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import T from 'components/Typography';
import MenuHeader from 'components/MenuHeader';
import Scene from 'components/Scene';

export default function Legal() {
  return (
    <Scene preload={false}>
      <View style={styles.container}>
        <MenuHeader
          leftAction="back"
          title="Legal"
          rightAction="menu"
        />
        <View style={styles.content}>
          <T.Heading style={styles.title}>Privacy</T.Heading>
          <T.Light style={styles.title}>content</T.Light>
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
  title: {
    color: 'white'
  }
});
