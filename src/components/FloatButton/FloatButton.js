import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import { normalizeHeight, normalize } from '../../util/common';

class FloatButton extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
  }

  render() {
    const { onPress } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} activeOpacity={1} >
          <Icon name='ios-add' style={styles.icon} size={30} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', zIndex: 100,
    bottom: normalizeHeight(30),
    right: normalize(20),
    height: normalize(50),
    width: normalize(50),
    borderRadius: normalize(25),
    elevation: 3,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: 'white',
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
    marginHorizontal: 8,
    paddingVertical: 5,
  },
});

export default FloatButton;