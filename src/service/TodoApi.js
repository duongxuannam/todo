import firebase from 'firebase';
import { firebaseConfig } from '../config/FirebaseConfig';

export const initFirebase = () => {
  return firebase.initializeApp(firebaseConfig);
};

export const connectData = (fn) => {
  // eslint-disable-next-line no-unused-vars
  // return new Promise((resolve, reject) => (
  //   firebase.database().ref('todos').orderByChild('priority')
  //     // .startAt(0)
  //     // .endAt(5)
  //     .on('value', (snapshot) => {

  //       const arr = [];
  //       snapshot.forEach(data => {
  //         arr.push({
  //           id: data.key,
  //           value: data.val(),
  //         });
  //       });
  //       resolve(arr);
  //     })
  // ));

  firebase.database().ref('todos').orderByChild('priority')
    // .startAt(0)
    // .endAt(5)
    .on('value', (snapshot) => {
      const arr = [];
      snapshot.forEach(data => {
        arr.push({
          id: data.key,
          value: data.val(),
        });
      });
      fn(arr);
    });
};





export const addTodo = async (params) => {
  try {
    const res = await firebase.database().ref('todos').push(params);
    return res.toJSON();
  } catch (e) {
    return e;
  }
};


export const getsTodo = async () => {
  try {
    const res = await firebase.database().ref('todos').on('value');
    const arr = [];
    res.forEach(data => {
      arr.push({
        id: data.key,
        value: data.val(),
      });
    });
    return arr;
  } catch (e) {
    return e;
  }
};

export const updateTodo = async (id, params) => {
  try {
    const res = await firebase.database().ref(`todos/${id}`).update(params);
    return res.toJSON();
  } catch (e) {
    return e;
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await firebase.database().ref('todos').child(id).remove();
    return res.toJSON();
  } catch (e) {
    return e;
  }
};

export default {
  addTodo, getsTodo, updateTodo, deleteTodo,
};