import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import { Try } from 'components/Conditional';
import SelectableImageRow from 'components/SelectableImageRow';
import Input from 'components/Input';
import T from 'components/Typography';


export default class ContactsSelection extends Component {
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
      <View>
        <Try condition={this.props.title}>
          <T.SubHeading style={styles.subheading}>Contacts</T.SubHeading>
        </Try>
        <Input
          label="search for contact"
          value={this.state.searchTerm}
          onChangeText={this.onChangeSearchTerm}
        />
        <T.SubHeading>Recent Transactions</T.SubHeading>
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
  subheading: {
    justifyContent: 'center',
  },
});
