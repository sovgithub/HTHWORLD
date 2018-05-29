import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Linking,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'components/Icon';
import NavigatorService from 'lib/navigator';
import T from 'components/Typography';

import memoize from 'lodash/fp/memoize';

const navigateTo = memoize((to) => () => NavigatorService.navigate(to));
const externalLinkTo = memoize((to) => () => {
  Linking.openURL(to).catch(err => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('An error occurred', err);
    }
  });
});

export default function Link({title, to, external, icon}) {
  const onPress = external ? externalLinkTo(to) : navigateTo(to);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSide}>
        {icon && <Image source={icon} style={styles.icon}/>}
        <T.Light style={styles.title}>{title}</T.Light>
      </View>
      <Icon icon="ios-arrow-forward" style={{size: 10, marginLeft: 'auto'}} />
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
  leftSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  title: {
    marginLeft: 20,
    color: 'white'
  },
});

Link.propTypes = {
  external: PropTypes.bool,
  icon: Image.propTypes.source,
  title: PropTypes.string,
  to: PropTypes.string,
};
