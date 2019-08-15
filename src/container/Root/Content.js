import React, { Component } from 'react';
import {
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

class Content extends Component {
  static propTypes = {
    todos: PropTypes.array,
    currentTime: PropTypes.any,
    renderItem: PropTypes.func,
    renderEmpty: PropTypes.func,
  };

  render() {
    const { todos, currentTime, renderItem, renderEmpty } = this.props;
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }} end={{ x: 2, y: 0.5 }}
        locations={[0, 0.2, 0.3, 0.4]}
        colors={['#DC8DEA', '#C58DE7', '#AB8FE7', '#888DE1']}
        style={{ flex: 1 }}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          style={{ marginHorizontal: 15 }}
          showsVerticalScrollIndicator={false}
          extraData={currentTime}
          // onEndReached={this.loadMoreDetails}
          // onEndReachedThreshold={0.2}
          removeClippedSubviews={true} scrollEventThrottle={16}
        />
      </LinearGradient>
    );
  }
}

export default Content;



