import * as React from 'react';
import {Button} from 'react-native';
import {NavigationScreenConfigProps, NavigationStackScreenOptions} from 'react-navigation';
import {getColors} from 'styles';

export type WrappedComponentType = React.ComponentClass<any> | React.StatelessComponent<any>;

export default function withHeader(title: string, WrappedComponent: WrappedComponentType) {
  return class Wrapper extends React.Component<void, void> {
    static displayName = `withHeader(${title})`;
    static navigationOptions: (opts: NavigationScreenConfigProps) => NavigationStackScreenOptions = ({navigation}) => ({
      title,
      headerRight: (
        <Button
          title="="
          onPress={() => navigation.navigate('DrawerOpen')}
          color={getColors().menu}
        />
      )
    })

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
