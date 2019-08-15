import { Dimensions, Platform } from 'react-native';
import Colors from '../themes/colors';

export const window = Dimensions.get('window');
const scale = window.width / 375;
const scaleHeight = window.height / 667;


export const windowWidth = window.width;

export const windowHeight = window.height;

export const ratioScreen = windowHeight / windowWidth;


export const normalize = (size) => {
  return Math.round(scale * size);
};

export const percentWidth = (percent) => {
  return Math.round(percent * window.width / 100);
};

export const normalizeHeight = (size) => {
  return Math.round(scaleHeight * size);
};

export const isIOS = Platform.OS === 'ios';

export const randomName = () => Math.random().toString(36).substring(2) + (new Date()).getTime().toString();


export const convertPriority = (value) => {
  var res;
  switch (value) {
  case 1:
    res = 'High';
    break;
  case 2:
    res = 'Medium';
    break;
  case 3:
    res = 'Low';
    break;
  }
  return res;
};


export const convertSeconds = (stringTime) => {


  const arrHandle = stringTime.split(':');
  // const hourHandle = arrHandle[0] == 12 ? 0 : arrHandle[0];
  const result = ((arrHandle[0]) * 3600) + ((arrHandle[1]) * 60);
  return result;
};

export const toHHMM = (secs) => {
  if (secs < 0) return;
  const sec_num = parseInt(secs, 10);
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor(sec_num / 60) % 60;
  const result = [hours, minutes]
    .map(v => v < 10 ? '0' + v : v)
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
  if (secs < 3600) return `${result} minutes`;
  return result;
};

export const setColor = (value) => {
  if (value < 3600) return Colors.red;
  if (value < 18000) return Colors.yellow;
  return Colors.green;

};