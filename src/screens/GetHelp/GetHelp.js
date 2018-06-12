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
            title="Browse our FAQs"
            to="https://support.hoardinvest.com/hc/en-us/sections/360000948793-FAQ"
          />
          <Link
            external
            title="Contact Us"
            to="mailto:support@hoardinvest.com"
          />
          <Link
            title="Submit a Request"
            to="CreateSupportTicket"
          />
          <Link
            external
            title="My Support"
            to="https://support.hoardinvest.com"
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
