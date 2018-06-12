import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import T from "components/Typography";
import Icon from 'components/Icon';
import { Try } from 'components/Conditional';

const WalletListEntry = ({ name, symbol, balance, value, onPress, change, imported }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.titleContainer}>
            <T.TitleAlternate style={{color: 'lightgrey'}}>
              {name}
            </T.TitleAlternate>
            <Try condition={imported}>
              <View style={styles.icon}>
                <Icon
                  style={{size: 15, color: 'black'}}
                  icon="ios-link"
                />
              </View>
            </Try>
          </View>
          <T.SmallAlternate style={{color: 'lightgrey'}}>
            {symbol} - {balance}
          </T.SmallAlternate>
        </View>
        <View style={styles.right}>
          <T.Price style={{color: 'lightgrey'}}>${value}</T.Price>
          <T.SubtitleAlternate>
            <T.SemiBoldAlternate style={{color: 'lightgrey'}}>{change}</T.SemiBoldAlternate>
          </T.SubtitleAlternate>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WalletListEntry;

WalletListEntry.propTypes = {
  balance: PropTypes.number.isRequired,
  change: PropTypes.string.isRequired,
  imported: PropTypes.bool,
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#1D252E",
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: 'row'
  },
  icon: {
    paddingLeft: 5
  },
  left: {
    flexGrow: 2
  },
  right: {
    flexGrow: 1,
    alignItems: "flex-end"
  }
});
