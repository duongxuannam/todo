import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Alert,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { connect } from 'react-redux';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import FloatButton from '../../components/FloatButton';
import EmptyList from '../../components/EmptyList';
import ItemList from '../../components/ItemList';
import Modal from './Modal';
import Content from './Content';
import { initFirebase, connectData } from '../../service/TodoApi';
import { convertSeconds } from '../../util/common';
import TodoActions from '../../redux/todoRedux';
import AppActions from '../../redux/appRedux';

// import Indicator from '../../component/Indicator';
import NoInternet from '../../components/NoInternet';

const today = new Date();

const currentTimeStartup = convertSeconds(`${today.getHours()}:${today.getMinutes()}`);

class RootContainer extends Component {
  static propTypes = {
    getsTodoRequest: PropTypes.func,
    getsTodoSuccess: PropTypes.func,
    todos: PropTypes.array,
    addTodoRequest: PropTypes.func,
    updateTodoRequest: PropTypes.func,
    connectivityChange: PropTypes.func,
    isConnected: PropTypes.bool,
    isConnectDatabase: PropTypes.bool,
    connectDatabase: PropTypes.func,
    deleteTodoRequest: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentTime: currentTimeStartup,
    };
  }

  async componentDidMount() {
    try {
      const { connectDatabase, connectivityChange } = this.props;
      initFirebase();


      this.timeMachine = setInterval(() => this.setTime(), 60000);
      NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

      NetInfo.fetch().then(async state => {
        if (state.isConnected) {
          connectData(connectDatabase);
        }
        connectivityChange(state.isConnected);
      });
    } catch (error) { } //eslint-disable-line
  }



  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    clearInterval(this.timeMachine);
  }

  handleConnectivityChange = async isConnectedParams => {

    const { isConnected, isConnectDatabase, connectivityChange, connectDatabase } = this.props;
    if (isConnected !== isConnectedParams && isConnectedParams === true && !isConnectDatabase) {
      connectivityChange(isConnectedParams);
      return connectData(connectDatabase);

    }
    connectivityChange(isConnectedParams);
  }

  setTime = () => {
    const now = new Date();
    const currentTime = convertSeconds(`${now.getHours()}:${now.getMinutes()}`);
    this.setState({ currentTime });
  }

  renderEmpty = () => (
    <EmptyList />
  )



  deleteTodo = (id) => {
    const { deleteTodoRequest } = this.props;
    Alert.alert(
      'Notification',
      'Do you wan\'t to delete?',
      [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deleteTodoRequest(id),
        },
      ],
      { cancelable: false },
    );
  }

  editTodo = (item) => {
    const valueItem = item.value;
    const params = {
      id: item.id,
      isEdit: true,
      modalVisible: true,
      priority: valueItem.priority,
      name: valueItem.name,
      time: valueItem.time,
    };
    this.modal ? this.modal.setParams(params) : null;
  }

  renderItem = ({ item }) => {
    const { currentTime } = this.state;
    return (
      <ItemList item={item} currentTime={currentTime} editTodo={this.editTodo} deleteTodo={this.deleteTodo} />
    );
  }

  openModal = () => {
    this.modal ? this.modal.show() : null;
  }

  render() {
    const { todos, addTodoRequest, updateTodoRequest, isConnected } = this.props;
    const { currentTime } = this.state;
    return (
      <View flex={1}>
        <StatusBar backgroundColor='#6D77A7' barStyle="dark-content" />
        <View flex={1} >
          <Header />
          <Content todos={todos} currentTime={currentTime} renderEmpty={this.renderEmpty} renderItem={this.renderItem} />
          <FloatButton onPress={this.openModal} />
        </View>
        <Modal ref={ref => this.modal = ref} addTodoRequest={addTodoRequest} updateTodoRequest={updateTodoRequest} />
        {/* <Indicator /> */}
        {!isConnected && <NoInternet />}
      </View >
    );
  }
}

const mapStateToProps = (state) => ({
  todos: get(state, ['todo', 'todos'], []),
  isTodosRefreshing: get(state, ['todo', 'isTodosRefreshing']),
  isTodosLoadingMore: get(state, ['todo', 'isTodosLoadingMore']),
  todosHasMore: get(state, ['todo', 'todosHasMore']),
  todosPage: get(state, ['todo', 'todosPage']),
  isConnected: get(state, ['app', 'isConnected']),
  isConnectDatabase: get(state, ['app', 'isConnectDatabase']),
});

const mapDispatchToProps = (dispatch) => ({
  connectDatabase: (todos, success, error) => dispatch(TodoActions.connectDatabase(todos, success, error)),
  getsTodoSuccess: (todos, todosHasMore, success, error) => dispatch(TodoActions.getsTodoSuccess(todos, todosHasMore, success, error)),
  getsTodoRequest: (params, success, error) => dispatch(TodoActions.getsTodoRequest(params, success, error)),
  addTodoRequest: (params, success, error) => dispatch(TodoActions.addTodoRequest(params, success, error)),
  updateTodoRequest: (id, params, success, error) => dispatch(TodoActions.updateTodoRequest(id, params, success, error)),
  deleteTodoRequest: (id, success, error) => dispatch(TodoActions.deleteTodoRequest(id, success, error)),
  connectivityChange: (isConnected) => dispatch(AppActions.connectivityChange(isConnected)
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);



