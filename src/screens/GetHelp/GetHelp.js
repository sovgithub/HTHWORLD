import React from 'react';
import { View, StyleSheet } from 'react-native';
import Link from 'components/Link';
import Scene from 'components/Scene';

export default function GetHelp() {
  return (
    <Scene preload={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Link
            external
            title="email us"
            to="support@hthcoin.world"
          />
          <Link
            external
            title="Contact Us"
            to="mailto:support@hthcoin.world"
          />
          <Link
            title="Submit a Request"
            to="CreateSupportTicket"
          />
          <Link
            external
            title="My Support"
            to="support@hthcoin.world"
          />
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
});
