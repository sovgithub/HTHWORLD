import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import SelectableImageRow from 'components/SelectableImageRow';
import Input from 'components/Input';
import T from 'components/Typography';


export default class CurrencySelection extends Component {
  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape(
      SelectableImageRow.propTypes
    )).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      shownList: props.items
    };
  }

  filterResults = () => this.setState({
    shownList: this.props.items.filter(
      item => item.title.toLowerCase().indexOf(this.state.searchTerm) !== -1
    )
  });

  onChangeSearchTerm = (searchTerm) => {
    this.setState({searchTerm}, this.filterResults); // throttle somehow
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView bounces={false}>
          {this.state.shownList.map((item, i) => (
            <SelectableImageRow key={i} {...item} />
          ))}
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  subheading: {
    justifyContent: 'center',
  },
});
