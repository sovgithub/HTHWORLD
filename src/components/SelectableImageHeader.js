import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import T from 'components/Typography';

export default function SelectableImageHeader({
  changePosition,
  imageSource,
  title,
  onPress
}) {
  const changeComponent = <T.Small>Change</T.Small>;
  return (
    <View style={styles.container}>
      <T.SubHeading style={styles.title}>
        {title}
      </T.SubHeading>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.imageContainer}>
          {changePosition === 'above' && changeComponent}

          {imageSource &&
            <Image style={styles.image} source={imageSource}/>
          }

          {changePosition === 'below' && changeComponent}
        </View>
      </TouchableOpacity>
    </View>
  );
}

SelectableImageHeader.propTypes = {
  changePosition: PropTypes.oneOf(['above', 'below']).isRequired,
  imageSource: Image.propTypes.source,
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
  title: {
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    margin: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: 'contain',
  },
});
