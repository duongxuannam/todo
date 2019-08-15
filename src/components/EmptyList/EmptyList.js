import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class EmptyList extends PureComponent {


  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <Icon name='ios-image' style={[{
          color: 'white',
          backgroundColor: 'transparent',
          paddingHorizontal: 5,
          marginHorizontal: 8,
          paddingVertical: 5,
        }]} size={30} />
        <Text style={{ fontSize: 14, color: 'white', marginTop: 10 }}>
          Data Empty
        </Text>
      </View>
    );
  }
}

export default EmptyList;