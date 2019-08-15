import { takeLatest, all, call, put, select } from 'redux-saga/effects';

import TodoApi from '../service/TodoApi';
import TodoActions, { TodoTypes } from '../redux/todoRedux';
import AppActions from '../redux/appRedux';

function* todoSaga() {
  yield all([
    yield takeLatest(TodoTypes.GETS_TODO_REQUEST, getsTodoRequest),
    yield takeLatest(TodoTypes.ADD_TODO_REQUEST, addTodoRequest),
    yield takeLatest(TodoTypes.UPDATE_TODO_REQUEST, updateTodoRequest),
    yield takeLatest(TodoTypes.DELETE_TODO_REQUEST, deleteTodoRequest),
    yield takeLatest(TodoTypes.CONNECT_DATABASE, connectDatabase),

  ]);
}

export function* connectDatabase(actions) {
  const { actionSuccess, actionFailure } = actions;
  try {
    yield put(AppActions.connectDatabaseAppRedux());
    actionSuccess && actionSuccess();
  } catch (error) {
    actionFailure && actionFailure(error);
  }
}

export function* getsTodoRequest(actions) {
  const { params, actionSuccess, actionFailure } = actions;
  const isConnectDatabase = yield select(state => state.app.isConnectDatabase);
  try {
    if (!isConnectDatabase) {
      return yield put(AppActions.showError('Not connected to the server.Can\'t sync data'));
    }
    const todos = yield call(TodoApi.getsTodo, params);
    yield put(TodoActions.getsTodoSuccess(todos));
    actionSuccess && actionSuccess(todos);
  } catch (error) {
    yield put(AppActions.showError(error.toString()));
    yield put(TodoActions.getsTodoFailure());
    actionFailure && actionFailure(error);
  }
}

export function* addTodoRequest(actions) {
  const { params, actionSuccess, actionFailure } = actions;
  const isConnectDatabase = yield select(state => state.app.isConnectDatabase);
  try {
    if (!isConnectDatabase) {
      return yield put(AppActions.showError('Not connected to the server.Can\'t sync data'));
    }
    const todo = yield call(TodoApi.addTodo, params);
    yield put(TodoActions.addTodoSuccess(todo));
    yield put(AppActions.showSuccess('Add item success'));
    actionSuccess && actionSuccess(todo);
  } catch (error) {
    yield put(AppActions.showError(error.toString()));
    yield put(TodoActions.addTodoFailure());
    actionFailure && actionFailure(error);
  }
}

export function* updateTodoRequest(actions) {
  const { id, params, actionSuccess, actionFailure } = actions;
  const isConnectDatabase = yield select(state => state.app.isConnectDatabase);
  try {
    if (!isConnectDatabase) {
      return yield put(AppActions.showError('Not connected to the server.Can\'t sync data'));
    }
    const todos = yield call(TodoApi.updateTodo, id, params);
    yield put(AppActions.showSuccess('Update success'));
    yield put(TodoActions.updateTodoSuccess(todos));
    actionSuccess && actionSuccess(todos);
  } catch (error) {
    yield put(AppActions.showError(error.toString()));
    yield put(TodoActions.updateTodoFailure());
    actionFailure && actionFailure(error);
  }
}

export function* deleteTodoRequest(actions) {
  const { id, actionSuccess, actionFailure } = actions;
  const isConnectDatabase = yield select(state => state.app.isConnectDatabase);
  try {
    if (!isConnectDatabase) {
      return yield put(AppActions.showError('Not connected to the server.Can\'t sync data'));
    }
    const todos = yield call(TodoApi.deleteTodo, id);
    yield put(TodoActions.deleteTodoSuccess(todos));
    actionSuccess && actionSuccess(todos);
    yield put(AppActions.showSuccess('Delete success'));
  } catch (error) {
    yield put(AppActions.showError(error.toString()));
    yield put(TodoActions.deleteTodoFailure());
    actionFailure && actionFailure(error);
  }
}


export default todoSaga;
