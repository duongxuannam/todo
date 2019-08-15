import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

class NoInternet extends PureComponent {

  render() {
    return (
      <View style={{ backgroundColor: 'red', paddingVertical: 8 }}>
        <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
          No internet. Data maybe not sync.
        </Text>
      </View >
    );
  }
}

export default NoInternet;