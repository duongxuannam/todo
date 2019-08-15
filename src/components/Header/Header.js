import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import { normalizeHeight } from '../../util/common';
import Colors from '../../themes/colors';

class Header extends PureComponent {


  render() {
    return (
      <View style={{
        justifyContent: 'center',
        height: normalizeHeight(60), backgroundColor: Colors.primary,
      }}>
        <Text style={{
          textAlign: 'center',
          fontSize: 15,
          fontWeight: '400',
          color: 'white',
        }}>
                    Todo list
        </Text>
      </View>
    );
  }
}

export default Header;