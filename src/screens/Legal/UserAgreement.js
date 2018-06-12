import React from 'react';
import { View, StyleSheet } from 'react-native';
import T from 'components/Typography';
import Scene from 'components/Scene';

export default function Legal() {
  return (
    <Scene preload={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <T.Heading style={styles.title}>User Agreement</T.Heading>
          <T.Light style={styles.title}>Coming Soon...</T.Light>
        </View>
      </View>
    </Scene>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    color: 'white',
  },
});
