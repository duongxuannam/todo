import React, { PureComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import styles from './IndicatorStyles';

class Indicator extends PureComponent {
  static propTypes = {
    isShowingIndicator: PropTypes.bool,
    backgroundColor: PropTypes.string,
  }

  render() {
    const { isShowingIndicator } = this.props;
    return (
      isShowingIndicator ? <View style={styles.absoluteTransparent}>
        <View style={styles.container}>
          <View style={styles.content}>
            <ActivityIndicator animating={true} color='white' size='small' />
          </View>
        </View>
      </View> : null
    );
  }
}

export default Indicator;