import React from 'react';
import {Button} from 'react-native';

export default function withHeader(title, WrappedComponent) {
  return class Wrapper extends React.Component {
    static displayName = `withHeader(${title})`;
    static navigationOptions = ({navigation}) => ({
      title,
      headerRight: (
        <Button
          title="="
          onPress={() => navigation.navigate('DrawerOpen')} />
      )
    })

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
