// Simple React Native specific changes
import { YellowBox } from 'react-native';


YellowBox.ignoreWarnings(['Require cycle:']);
export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  baseURL: __DEV__ ? 'http://149.28.229.28/api/wallpapers' : 'http://149.28.229.28/api/wallpapers',
};
