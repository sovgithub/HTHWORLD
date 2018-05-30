import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import T from 'components/Typography';
import Icon from 'components/Icon';
import NavigationActions from 'lib/navigator';
import createStyles, { padding, colors, typography } from 'styles';

const BACK_ICON = require('assets/bck.png');
const CLOSE_ICON = require('assets/closeicon.png');
const MENU_ICON = require('assets/sidebar.png');

const goBack = () => NavigationActions.back();
const openMenu = () => NavigationActions.openDrawer();

function LeftActionComponent({ type }) {
  if (!type) {
    return null;
  }
  if (type === 'back' || type === 'cancel') {
    return (
      <View style={styles.leftActionContainer}>
        <TouchableOpacity onPress={goBack}>
          <Image source={type === 'back' ? BACK_ICON : CLOSE_ICON} />
        </TouchableOpacity>
      </View>
    );
  } else if (typeof type === 'object') {
    return <View style={styles.leftActionContainer}>{type}</View>;
  }
}

function RightActionComponent({ type }) {
  if (!type) {
    return null;
  }
  if (type === 'menu') {
    return (
      <TouchableOpacity onPress={openMenu}>
        <Image source={MENU_ICON} />
      </TouchableOpacity>
    );
  } else if (typeof type === 'object') {
    return type;
  }
}

export default function MenuHeader({
  leftAction,
  rightAction,
  title,
  multipage,
  currentPage,
  totalPages,
}) {
  const headerStyle = leftAction
    ? styles.titleLight
    : [createStyles().header, styles.titleBold];

  return (
    <View style={styles.container}>
      <LeftActionComponent type={leftAction} />
      <View style={styles.headerContainer}>
        <T.Heading style={headerStyle}>{title}</T.Heading>
      </View>
      {multipage && (
        <View style={styles.pagerContainer}>
          <T.Light style={styles.pager}>
            {currentPage}/{totalPages}
          </T.Light>
        </View>
      )}
      <View style={styles.rightActionContainer}>
        <RightActionComponent type={rightAction} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: padding.md,
    paddingTop: padding.lg,
  },
  headerContainer: {},
  titleBold: {
    color: colors.white,
  },
  titleLight: {
    color: colors.grayLight,
    fontSize: typography.size.md,
    fontWeight: typography.weight.normal,
  },
  pagerContainer: {},
  pager: {
    color: colors.grayLight,
    fontSize: typography.size.md,
    fontWeight: typography.weight.normal,
  },
  rightActionContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  rightActionText: {
    color: colors.white,
    fontSize: typography.size.md,
    fontWeight: typography.weight.normal,
  },
  leftActionContainer: {
    flex: 1,
  },
});
