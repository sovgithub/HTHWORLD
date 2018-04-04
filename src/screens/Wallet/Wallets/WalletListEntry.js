import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import T from "components/Typography";

const WalletListEntry = ({ name, symbol, balance, value, onPress, change }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <T.TitleAlternate>{name}</T.TitleAlternate>
        <T.SmallAlternate>
          {symbol} - {balance}
        </T.SmallAlternate>
      </View>
      <View style={styles.right}>
        <T.Price>${value}</T.Price>
        <T.SubtitleAlternate>
          <T.SemiBoldAlternate>{change}</T.SemiBoldAlternate>
        </T.SubtitleAlternate>
      </View>
    </TouchableOpacity>
  );
};

export default WalletListEntry;

WalletListEntry.propTypes = {
  balance: PropTypes.number.isRequired,
  change: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  left: {
    flexGrow: 2
  },
  right: {
    flexGrow: 1,
    alignItems: "flex-end"
  }
});
