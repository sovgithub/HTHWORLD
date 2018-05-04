import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes, { string, object, array } from 'prop-types';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const detailsIcon = <Icon name="settings" size={30} color="#fff" />;
const payIcon = <Icon name="cloud-download" size={30} color="#fff" />;
const requestIcon = <Icon name="cloud-upload" size={30} color="#fff" />;
const viewIcon = <Icon name="grid" size={30} color="#fff" />;

export default class SwipableList extends Component {
  static propTypes = {
    title: string,
    amount: string,
    change: string,
    colors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    data: array.isRequired,
  };

  static defaultProps = {
    title: 'Default Asset',
    amount: '$45,524.92',
    change: '5.24%',
    colors: '#0F716A',
    data: [],
  };

  state = {
    currentlyOpenSwipeable: null,
  };

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  render() {
    const { currentlyOpenSwipeable } = this.state;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }

        this.setState({ currentlyOpenSwipeable: swipeable });
      },
      onClose: () => this.setState({ currentlyOpenSwipeable: null }),
    };

    return (
      <ScrollView onScroll={this.handleScroll} style={styles.container}>
        {this.props.data.map((coin, i) => {
          return <CoinRow key={`coinrow-${i}`} {...itemProps} coin={coin} />;
        })}
      </ScrollView>
    );
  }
}

function CoinRow({ onOpen, onClose, coin }) {
  return (
    <Swipeable
      leftButtons={[
        <TouchableOpacity style={[styles.defaultItem, styles.leftSwipeItem]}>
          {detailsIcon}
        </TouchableOpacity>,
      ]}
      rightButtons={[
        <TouchableOpacity style={[styles.defaultItem, styles.rightSwipeItem]}>
          {payIcon}
          <Text style={[styles.rowText, styles.actionText]}>PAY</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.defaultItem, styles.rightSwipeItem]}>
          {requestIcon}
          <Text style={[styles.rowText, styles.actionText]}>REQUEST</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.defaultItem, styles.rightSwipeItem]}>
          {viewIcon}
          <Text style={[styles.rowText, styles.actionText]}>VIEW</Text>
        </TouchableOpacity>,
      ]}
      onRightButtonsOpenRelease={onOpen}
      onRightButtonsCloseRelease={onClose}
    >
      <View style={[styles.row, styles.listItem]}>
        <Text style={styles.rowText}>{coin.title}</Text>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    paddingTop: 20,
  },
  defaultItem: {
    flexDirection: 'column',
  },
  row: {
    backgroundColor: 'rgba(52,58,66, 0.5)',
    borderRadius: 10,
    margin: 5,
  },
  rowText: {
    color: '#f5f5f5',
    fontSize: 20,
  },
  actionText: {
    color: '#f5f5f5',
    fontSize: 10,
  },
  listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
});
