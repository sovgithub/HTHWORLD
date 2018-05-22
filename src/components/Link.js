import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'components/Icon';
import NavigatorService from 'lib/navigator';
import T from 'components/Typography';

export default function Link({title, to}) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => NavigatorService.navigate(to)}>
      <T.Light style={styles.title}>{title}</T.Light>
      <Icon icon="ios-arrow-forward" style={{size: 10}} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(151, 151, 151, 0.21)'
  },
  title: {
    color: 'white'
  },
  icon: {
    color: 'white'
  },
});

Link.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string,
};
