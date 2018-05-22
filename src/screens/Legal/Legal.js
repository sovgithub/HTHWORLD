import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import MenuHeader from 'components/MenuHeader';
import Link from 'components/Link';
import Scene from 'components/Scene';

export default function Legal() {
  return (
    <Scene preload={false}>
      <View style={styles.container}>
        <MenuHeader
          title="Legal"
          rightAction="menu"
        />
        <View style={styles.content}>
          <Link title="User Agreement" to="UserAgreement" />
          <Link title="Privacy" to="Privacy" />
          <Link title="Compliance" to="Compliance" />
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
