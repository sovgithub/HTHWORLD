import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Button from 'components/Button';
import T from 'components/Typography';

import createStyles, { colors, gradients, fonts, dimensions } from 'styles';
import LinearGradient from 'react-native-linear-gradient';

const styles = createStyles();

const customStyles = createStyles({
  header: {
    fontSize: fonts.size.lg,
    color: colors.pinkDark,
  },
});

export default class StyleGuide extends Component {
  render() {
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.1 }}
        end={{ x: 0.1, y: 1.0 }}
        colors={['#282A3A', '#151A21']}
      >
        <ScrollView
          style={[
            styles.container,
            { height: dimensions.height, width: dimensions.width },
          ]}
        >
          <Text style={customStyles.header}>Custom</Text>
          <Text style={[styles.header, { color: colors.white }]}>White</Text>
          <Text style={{ color: colors.grayLighter }}>GRAYLIGHTER</Text>
          <Text style={{ color: colors.grayLight }}>GRAYLIGHT</Text>
          <Text style={{ color: colors.gray }}>GRAY</Text>
          <Text style={{ color: colors.grayDark }}>GRAYDARK</Text>
          <Text style={{ color: colors.grayDarker }}>GRAYDARKER</Text>
          <Text style={{ color: colors.black }}>BLACK</Text>

          <LinearGradient
            start={gradients.horizontal.start}
            end={gradients.horizontal.end}
            colors={gradients.pink}
            style={styles.section}
          >
            <Text style={{ color: colors.black }}>BLACK</Text>
          </LinearGradient>

          <LinearGradient
            start={gradients.vertical.start}
            end={gradients.vertical.end}
            colors={gradients.pink}
            style={styles.section}
          >
            <Text style={[styles.text, { color: colors.white }]}>BLACK</Text>
          </LinearGradient>
          <LinearGradient
            start={gradients.horizontal.start}
            end={gradients.horizontal.end}
            colors={gradients.green}
            style={styles.section}
          >
            <Text style={[styles.text, { color: colors.white }]}>BLACK</Text>
          </LinearGradient>
          <LinearGradient
            start={gradients.horizontal.start}
            end={gradients.horizontal.end}
            colors={gradients.green}
            style={[styles.section, { height: 300 }]}
          />
        </ScrollView>
      </LinearGradient>
    );
  }
}
