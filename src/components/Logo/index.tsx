import * as React from 'react';
import {Image} from 'react-native';

const Logo: React.SFC<{}> = () => {
  return (
    <Image source={require('assets/logo.png')} />
  );
}

export default Logo;
