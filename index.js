/**
 * 主入口
 */
import {AppRegistry} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet'
import cssVariables from './src/style/cssVariables'
import App from './src/App';

EStyleSheet.build(cssVariables);
AppRegistry.registerComponent('RNApp', () => App);
