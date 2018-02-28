import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { getColors } from 'styles';
import NavigatorService from 'lib/navigator';
import Icon from 'components/Icon';

export default function withHeader(title, WrappedComponent) {
  return class Wrapper extends React.Component {
    static displayName = `withHeader(${title})`;
    static navigationOptions = () => ({
      drawerLabel: ({ focused }) => (
        <Text
          style={{
            color: focused
              ? getColors().interactivePrimaryText
              : getColors().textPrimary,
            backgroundColor: focused
              ? getColors().interactivePrimary
              : getColors().background,
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
      headerStyle: { backgroundColor: getColors().background },
      headerRight: (
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20
          }}
          onPress={() => NavigatorService.navigate('DrawerOpen')}
        >
          <Icon icon="ios-menu-outline" style={{ size: 25 }} />
        </TouchableOpacity>
      )
    });

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
