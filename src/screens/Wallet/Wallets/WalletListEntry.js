import React from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import T from "components/Typography";
import Icon from 'components/Icon';
import Conditional, { Try, Otherwise} from 'components/Conditional';
import { getCoinMetadata } from 'lib/currency-metadata';

const WalletListEntry = ({ name, symbol, balance, value, onPress, change, imported, price }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.left}>

          <View style={styles.iconContainer}>
            <Conditional>
            <Try condition={imported}>
              <View style={styles.icon}>
                <Icon
                  style={{size: 15, color: 'black'}}
                  icon="ios-link"
                />
              </View>
            </Try>
            <Otherwise>
              <Image
                style={styles.coinImage}
                source={getCoinMetadata(symbol).image}
              />
            </Otherwise>
          </Conditional>
          </View>

          <View style={styles.titleContainer}>
            <T.TitleAlternate style={{color: 'lightgrey', fontSize: 20}}>
              {name}
            </T.TitleAlternate>
            <T.SmallAlternate style={{color: '#777'}}>
              ${price} / {symbol}
            </T.SmallAlternate>
          </View>
        </View>

        <View style={styles.right}>
          <T.Price style={{color: 'lightgrey', fontSize: 20}}>${value}</T.Price>
          <T.SubtitleAlternate>
            <T.SemiBoldAlternate style={{color: '#777'}}>{balance} {symbol}</T.SemiBoldAlternate>
          </T.SubtitleAlternate>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WalletListEntry;

WalletListEntry.propTypes = {
  balance: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#202934",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: 'column'
  },
  icon: {
    paddingLeft: 5
  },
  left: {
    flexDirection: 'row',
    flexGrow: 2
  },
  right: {
    flexGrow: 1,
    alignItems: "flex-end"
  },
  coinImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
});
