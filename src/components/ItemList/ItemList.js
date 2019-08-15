import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';
import PropTypes from 'prop-types';

import { normalizeHeight, normalize, convertSeconds, toHHMM, convertPriority, setColor } from '../../util/common';
import Colors from '../../themes/colors';

class ItemList extends Component {
  static propTypes = {
    item: PropTypes.object,
    currentTime: PropTypes.any,
    deleteTodo: PropTypes.func,
    editTodo: PropTypes.func,
  }

  render() {
    const { item, currentTime, deleteTodo, editTodo } = this.props;
    const valueItem = item.value;
    const swipeoutBtns = [
      {
        onPress: () => editTodo(item),
        text: 'Edit',
        backgroundColor: 'green',
      },
      {
        text: 'Delete',
        onPress: () => deleteTodo(item.id),
        backgroundColor: 'red',
      },
    ];
    const timeItem = convertSeconds(valueItem.time);

    const isExpired = !(currentTime < timeItem);
    const timeLeft = toHHMM(timeItem - currentTime);
    // console.log('timeLeft ', timeLeft);
    // console.log('currentTime ', currentTime);
    // console.log('timeItem ', timeItem);
    // console.log('valueItem ', valueItem);

    return (
      <View style={styles.container}>
        <Swipeout
          right={swipeoutBtns}>
          <View style={styles.subContainer}>
            <View style={styles.wrapIcon}>
              <Icon name='ios-images' style={styles.icon} size={30} />
            </View>
            <View style={styles.wrapContent}>
              <View style={styles.wrapSubContent}>
                <Text
                  style={styles.text}
                  numberOfLines={2}
                >
                  Name: {valueItem.name}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[styles.text, { marginTop: normalizeHeight(7) }]}
                >
                  Priority: {convertPriority(valueItem.priority)}
                </Text>
              </View>
              <View style={styles.wrapTime}>
                <Text
                  style={styles.text}
                >
                  Time: {valueItem.time}
                </Text>
                <Text
                  style={[styles.text, {
                    color: Colors.txt155,
                    marginTop: normalizeHeight(8),
                  }]}
                >
                  {isExpired ? 'Expired' :
                    <Text
                      style={{
                        color: setColor(timeItem - currentTime),
                      }}
                    >
                      {timeLeft} left
                    </Text>
                  }
                </Text>
              </View>
            </View>
          </View>
        </Swipeout>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: normalize(20),
  },
  subContainer: {
    elevation: 2,
    height: normalizeHeight(80),
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  icon: {
    color: Colors.txt155,
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
    marginHorizontal: 8,
    paddingVertical: 5,
  },
  wrapIcon: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  wrapContent: { flex: 3.5, flexDirection: 'row' },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.blue,
  },
  wrapSubContent: { flex: 1, justifyContent: 'center' },
  wrapTime: { justifyContent: 'center', marginHorizontal: 10 },
});


export default ItemList;