import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import Button from 'components/Button';
import T from 'components/Typography';
import Input from 'components/Input';

import createStyles, {
  colors,
  gradients,
  typography,
  dimensions,
} from 'styles';
import LinearGradient from 'react-native-linear-gradient';

const styles = createStyles();

const customStyles = createStyles({
  header: {
    fontSize: typography.size.lg,
    color: colors.pinkDark,
  },
  input: {
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
});

export default class StyleGuide extends Component {
  state = {
    inputText: '',
  };

  render() {
    return (
      <LinearGradient
        start={gradients.topLeft.start}
        end={gradients.topLeft.end}
        colors={gradients.blue}
      >
        <ScrollView
          style={[
            styles.container,
            { height: dimensions.height, width: dimensions.width },
          ]}
        >
          <Button onPress={() => false}>Default Button example</Button>
          <Button type="primary" onPress={() => false}>
            Primary Button example
          </Button>
          <Button type="text" onPress={() => false}>
            Text Button example
          </Button>

          <Input
            style={customStyles.input}
            label="Email"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            keyboardType="email-address"
            onSubmitEditing={() => false}
            onChangeText={t => this.setState({ textInput: t })}
            value={this.state.textInput || ''}
          />
          <View
            style={[
              styles.section,
              {
                width: 300,
                height: 300,
                borderWidth: 1,
                borderColor: 'white',
                position: 'relative',
                overflow: 'hidden',
              },
            ]}
          >
            {/*  Gradient over an image*/}
            <Image
              style={{
                width: 300,
                height: 300,
                position: 'absolute',
              }}
              source={{
                uri:
                  'https://facebook.github.io/react-native/docs/assets/favicon.png',
              }}
            />

            <LinearGradient
              start={gradients.horizontal.start}
              end={gradients.horizontal.end}
              colors={['rgba(0, 160, 115, 0.85)', 'rgba(0, 121, 130, 1)']}
              style={{
                height: 300,
                width: 300,
                position: 'absolute',
              }}
            />
          </View>

          <T.Light>Light</T.Light>
          <T.Heading>Heading</T.Heading>
          <T.SubHeading>SubHeading</T.SubHeading>
          <T.GrayedOut>GrayedOut</T.GrayedOut>
          <T.SemiBold>SemiBold</T.SemiBold>
          <T.Small>Small</T.Small>
          <T.ButtonText>ButtonText</T.ButtonText>
          <T.Price>Price</T.Price>
          <T.PriceLarge>PriceLarge</T.PriceLarge>
          <T.PriceHeading>PriceHeading</T.PriceHeading>
          <T.TitleAlternate>TitleAlternate</T.TitleAlternate>
          <T.SemiBoldAlternate>SemiBoldAlternate</T.SemiBoldAlternate>
          <T.SubtitleAlternate>SubtitleAlternate</T.SubtitleAlternate>
          <T.SmallAlternate>SmallAlternate</T.SmallAlternate>

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
