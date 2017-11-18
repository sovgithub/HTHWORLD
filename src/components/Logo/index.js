// @flow
import React from 'react';
import {Image} from 'react-native';

export default function Logo() {
  return (
    <Image source={require('./logo.png')} />
  );
}
