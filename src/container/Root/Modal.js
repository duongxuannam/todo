import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Modal, Picker,
  Alert,
  Text,
  StyleSheet,
  TimePickerAndroid,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

import { normalizeHeight, normalize, windowWidth } from '../../util/common';
import Colors from '../../themes/colors';


export default class RootModal extends Component {
  static propTypes = {
    addTodoRequest: PropTypes.func,
    updateTodoRequest: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalVisible: false,
      priority: 1,
      name: '',
      time: '',
    };
  }

  show = () => {
    this.setState({ modalVisible: true });
  }

  hide = () => {
    this.setState({
      isEdit: false,
      modalVisible: false,
      priority: 1,
      name: '',
      time: '',
    });
  }

  setParams = (params) => {
    this.setState(params);
  }

  addTodoRequest = () => {
    const { addTodoRequest } = this.props;
    const { name, priority, time } = this.state;
    if (name && priority && time) {
      addTodoRequest({
        name,
        priority,
        time,
      });
      return this.hide();
    }
    Alert.alert(
      'Notification',
      'Please complete field',
      [

        {
          text: 'Ok',
          onPress: () => null,
        },
      ],
    );
  }

  updateTodoRequest = () => {
    const { updateTodoRequest } = this.props;
    const { name, priority, time, id } = this.state;
    if (name && priority && time) {
      updateTodoRequest(id, {
        name,
        priority,
        time,
      });
      return this.hide();
    }
    Alert.alert(
      'Notification',
      'Please complete field',
      [
        {
          text: 'Ok',
          onPress: () => null,
        },
      ],
    );
  }

  openPicker = async () => {
    const { time } = this.state;
    const indexOfTime = time.indexOf(':');
    const params = time ? {
      hour: parseInt(time.slice(0, indexOfTime)),
      time: parseInt(time.slice(indexOfTime + 1)),
      is24Hour: true,
    } : { is24Hour: true };
    try {
      const { hour, minute } = await TimePickerAndroid.open(params);
      if (hour == 0 || minute == 0 || (hour && minute)) {
        const hourHandle = hour < 10 ? `0${hour}` : hour;
        const minuteHandle = minute < 10 ? `0${minute}` : minute;
        this.setState({
          time: `${hourHandle}:${minuteHandle}`,
        });
      }
      // eslint-disable-next-line no-empty
    } catch ({ code, message }) { }
  }

  render() {
    const { name, modalVisible, time, priority, isEdit } = this.state;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        }}>
        <View style={styles.container}>

          <TouchableWithoutFeedback onPress={this.hide}>
            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0, 0, 0, 0.8)' }]} />
          </TouchableWithoutFeedback>
          <View style={styles.subContainer}>
            <View style={styles.wrapTitle}>
              <Text
                style={styles.title}
              >
                {isEdit ? 'Edit' : 'Add'}
              </Text>
            </View>
            <View style={styles.wrapContent}>
              <View style={styles.wrapItem}>
                <Text style={styles.textLabel} >
                  Name
                </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(name) => this.setState({ name })}
                  value={name}
                />
              </View>

              <View style={styles.wrapItem}>
                <Text
                  style={styles.textLabel}
                >
                  Priority
                </Text>
                <Picker
                  selectedValue={priority}
                  style={styles.picker}
                  // eslint-disable-next-line no-unused-vars
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ priority: itemValue })
                  }>
                  <Picker.Item label="High" value={1} />
                  <Picker.Item label="Medium" value={2} />
                  <Picker.Item label="Low" value={3} />
                </Picker>
              </View>

              <View style={styles.wrapItem}>
                <Text style={styles.textLabel} >
                  Time
                </Text>
                <TouchableOpacity onPress={this.openPicker} style={{ flex: 3 }} >
                  <Text style={styles.textLabel} >
                    {time ? time : 'HH:mm'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity style={{ flex: 1 }} onPress={this.hide}>
                <Text style={styles.textFooter} >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1 }} onPress={isEdit ? this.updateTodoRequest : this.addTodoRequest}>
                <Text style={styles.textFooter} >
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    width: windowWidth - 40,
    borderRadius: normalize(3),
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginVertical: normalizeHeight(10),
  },
  wrapTitle: { alignItems: 'center', backgroundColor: Colors.primary },
  wrapContent: {
    paddingVertical: 20,
    paddingHorizontal: normalize(15),
  },
  textLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    color: Colors.txt74,
  },
  wrapItem: { flexDirection: 'row', alignItems: 'center' },
  textInput: {
    flex: 3,
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(3),
    borderColor: Colors.txt155,
    borderWidth: 1,
    fontSize: 15,
    borderRadius: 3,
  },
  picker: { height: 50, flex: 3 },
  footer: { flexDirection: 'row', justifyContent: 'center', backgroundColor: Colors.primary },
  textFooter: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginVertical: normalizeHeight(10),
  },
});