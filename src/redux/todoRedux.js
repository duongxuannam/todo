import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  connectDatabase: ['todos', 'actionSuccess', 'actionFailure'],


  getsTodoRequest: ['params', 'actionSuccess', 'actionFailure'],
  getsTodoSuccess: ['todos', 'hasMore'],
  getsTodoFailure: ['error'],

  addTodoRequest: ['params', 'actionSuccess', 'actionFailure'],
  addTodoSuccess: ['todo', 'hasMore'],
  addTodoFailure: ['error'],

  updateTodoRequest: ['id', 'params', 'actionSuccess', 'actionFailure'],
  updateTodoSuccess: ['todo'],
  updateTodoFailure: ['error'],

  deleteTodoRequest: ['id', 'actionSuccess', 'actionFailure'],
  deleteTodoSuccess: ['todo'],
  deleteTodoFailure: ['error'],

});

export const TodoTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  todos: [],
  isTodosRefreshing: false,
  isTodosLoadingMore: false,
  todosHasMore: true,
  todosPage: 1,


});

/* ------------- Reducers ------------- */

export const connectDatabase = (state, { todos }) => {
  return state.merge({
    ...state,
    todos,
  });
};

export const getsTodoRequest = (state) => {
  return state.merge({
    ...state,
    isTodosRefreshing: true,
    todosPage: 1,
  });
};

export const getsTodoSuccess = (state, { todos, hasMore }) => {
  const { isTodosLoadingMore } = state;
  if (isTodosLoadingMore) {
    let dataHandle = state.todos.concat(todos);
    return state.merge({
      ...state,
      todos: dataHandle,
      isTodosLoadingMore: false,
      isTodosRefreshing: false,
      todosHasMore: hasMore,
    });
  }
  else return state.merge({
    ...state,
    todos,
    isTodosLoadingMore: false,
    isTodosRefreshing: false,
    todosHasMore: hasMore,
  });
};

export const getsTodoFailure = (state, { error }) => {
  return state.merge({
    ...state,
    error,
    isTodosLoadingMore: false,
    isTodosRefreshing: false,
  });
};


export const addTodoRequest = (state) => {
  return state.merge({
    ...state,
    isAddRequesting: true,
  });
};

export const addTodoSuccess = (state, { todo }) => {
  let dataHandle = state.todos.concat(todo);
  return state.merge({
    ...state,
    isAddRequesting: false,
    todo: dataHandle,
  });

};

export const addTodoFailure = (state) => {

  return state.merge({
    ...state,
    isAddRequesting: false,
  });

};



export const updateTodoRequest = (state) => {
  return state.merge({
    ...state,
    isUpdating: true,
  });
};

export const updateTodoSuccess = (state) => {
  return state.merge({
    ...state,
    isUpdating: false,
  });
};

export const updateTodoFailure = (state) => {
  return state.merge({
    ...state,
    isUpdating: false,
  });
};


export const deleteTodoRequest = (state) => {
  return state.merge({
    ...state,
    isDeleting: true,
  });
};

export const deleteTodoSuccess = (state) => {
  return state.merge({
    ...state,
    isDeleting: false,
  });
};

export const deleteTodoFailure = (state) => {
  return state.merge({
    ...state,
    isDeleting: false,
  });
};



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONNECT_DATABASE]: connectDatabase,

  [Types.GETS_TODO_REQUEST]: getsTodoRequest,
  [Types.GETS_TODO_SUCCESS]: getsTodoSuccess,
  [Types.GETS_TODO_FAILURE]: getsTodoFailure,

  [Types.ADD_TODO_REQUEST]: addTodoRequest,
  [Types.ADD_TODO_SUCCESS]: addTodoSuccess,
  [Types.ADD_TODO_FAILURE]: addTodoFailure,

  [Types.UPDATE_TODO_REQUEST]: updateTodoRequest,
  [Types.UPDATE_TODO_SUCCESS]: updateTodoSuccess,
  [Types.UPDATE_TODO_FAILURE]: updateTodoFailure,

  [Types.DELETE_TODO_REQUEST]: deleteTodoRequest,
  [Types.DELETE_TODO_SUCCESS]: deleteTodoSuccess,
  [Types.DELETE_TODO_FAILURE]: deleteTodoFailure,
});
