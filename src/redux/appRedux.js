import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { showMessage } from 'react-native-flash-message';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startupRequest: null,
  startupSuccess: null,

  showIndicator: null,
  hideIndicator: null,

  showErrorRequest: ['error'],

  showError: ['errorMessage'],
  showSuccess: ['message'],

  connectivityChange: ['isConnected'],

  connectDatabaseAppRedux: null,

});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isConnected: true,
  isReady: false,
  isShowingIndicator: false,
  isConnectDatabase: false,
});

/* ------------- Reducers ------------- */

export const connectDatabaseAppRedux = (state) => {
  return state.merge({
    ...state,
    isConnectDatabase: true,
  });
};


const connectivityChange = (state, { isConnected }) => {
  return state.merge({ isConnected });
};


export const startupRequest = (state) => {
  return state.merge({ isReady: false });
};

export const startupSuccess = (state) => {
  return state.merge({ isReady: true });
};

// handler show indicator
export const showIndicator = (state) => {
  return state.merge({ isShowingIndicator: true });
};

// handler hide indicator
export const hideIndicator = (state) => {
  return state.merge({ isShowingIndicator: false });
};

// Handle show error
const showError = (state, { errorMessage }) => {
  showMessage({
    message: 'Error',
    description: errorMessage,
    type: 'danger',
  });
  return state;
};

// Handle show Success
const showSuccess = (state, { message }) => {
  showMessage({
    message: 'Success',
    description: message,
    type: 'success',
  });
  return state;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP_REQUEST]: startupRequest,
  [Types.STARTUP_SUCCESS]: startupSuccess,

  [Types.SHOW_INDICATOR]: showIndicator,
  [Types.HIDE_INDICATOR]: hideIndicator,

  [Types.SHOW_ERROR]: showError,
  [Types.SHOW_SUCCESS]: showSuccess,
  [Types.CONNECTIVITY_CHANGE]: connectivityChange,

  [Types.CONNECT_DATABASE_APP_REDUX]: connectDatabaseAppRedux,

});
