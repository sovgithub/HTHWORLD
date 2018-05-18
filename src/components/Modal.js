import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Button from 'components/Button';
import withDismissableKeyboard from 'hocs/withDismissableKeyboard';

const DismissableView = withDismissableKeyboard(View);

export default function Modal({
  children,
  height,
  show,
  title,
  onCancel,
  actionButtons,
}) {
  return (
    <DismissableView
      style={[styles.container, { display: show ? 'flex' : 'none', height }]}
    >
      <TouchableOpacity onPress={onCancel}>
        <Text style={styles.xButton}>X</Text>
      </TouchableOpacity>
      <Text style={styles.header}>{title}</Text>
      {children}
      <View style={styles.actionButtons}>
        {actionButtons.map(({ type, onPress, text, disabled }) => (
          <Button
            key={text}
            disabled={disabled}
            type={type}
            style={styles.button}
            onPress={onPress}
          >
            {text}
          </Button>
        ))}
      </View>
    </DismissableView>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  height: PropTypes.string,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  actionButtons: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
    })
  ),
};

Modal.defaultProps = {
  height: '95%',
  actionButtons: [],
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingHorizontal: 20,
    paddingTop: 30,
    left: 10,
    right: 10,
    bottom: 0,
    backgroundColor: '#FFF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  xButton: {
    alignSelf: 'flex-end',
    fontSize: 30,
    fontWeight: '100',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 25,
    fontWeight: '900',
  },
  actionButtons: {
    width: '100%',
    marginTop: 'auto',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    overflow: 'hidden',
  },
});
