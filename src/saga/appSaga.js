import { takeLatest, all } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
// import moment from 'moment'
// eslint-disable-next-line no-unused-vars
import AppActions, { AppTypes } from '../redux/appRedux';

function* appSaga() {
  yield all([
    yield takeLatest(AppTypes.SHOW_ERROR_REQUEST, showErrorRequest),
    yield takeLatest(AppTypes.STARTUP_REQUEST, startupRequest),

  ]);
}

// eslint-disable-next-line require-yield
function* startupRequest() {
  // eslint-disable-next-line no-empty
  try {
  } catch (error) {
    // yield put(AppActions.showErrorRequest(error));
  }
}

// eslint-disable-next-line require-yield
export function* showErrorRequest({ error }) {
  showMessage({
    message: 'Error',
    description: error.message,
    type: 'danger',
    icon: 'warning',
  });
}



export default appSaga;
