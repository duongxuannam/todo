/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import RootContainer from './src/container/Root';
import createStore from './src/redux';

const store = createStore();


class App extends Component {
  render() {
    return (
      <Provider store={store}>

        <RootContainer />
        <FlashMessage
          position="top"
          icon={{
            icon: 'warning',
            position: 'left',
          }}
        />
      </Provider>
    );
  }
}

export default App;
