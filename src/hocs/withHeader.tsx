import * as React from 'react';
import {Button, Text} from 'react-native';
import {NavigationScreenConfigProps, NavigationStackScreenOptions} from 'react-navigation';
import {getColors} from 'styles';

export type WrappedComponentType = React.ComponentClass<any> | React.StatelessComponent<any>;

export default function withHeader(title: string, WrappedComponent: WrappedComponentType) {
  return class Wrapper extends React.Component<void, void> {
    static displayName = `withHeader(${title})`;
    static navigationOptions: (opts: NavigationScreenConfigProps) => NavigationStackScreenOptions = ({navigation}) => ({
      drawerLabel: ({focused}: {focused: boolean}) => (
        <Text
          style={{
            color: focused ? getColors().interactivePrimaryText : getColors().textPrimary,
            backgroundColor: focused ? getColors().interactivePrimary : getColors().background,
            padding: 20,
            textAlign: 'center',
            width: '100%'
          }}
        >
          {title}
        </Text>
      ),
      headerTitle: title,
      headerTintColor: getColors().textPrimary,
      headerStyle: {backgroundColor: getColors().background},
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
