/* 系统服务
 * @Author: dongxiaochai@163.com
 * @Date: 2018-08-08 13:59:10
 * @Last Modified by: dongxiaochai@163.com
 * @Last Modified time: 2018-08-10 15:15:00
 */

import io from './io';
import storage, {StorageKeys} from '@/libs/storage'
// import deviceInfo from 'react-native-device-info'

let _deviceCode = null;
let _accessToken = null;

export default {
	//获取系统设备信息
	async getDeviceCode() {
		if(!_deviceCode){
			_deviceCode = await storage.get(StorageKeys.DEVICE_CODE);
		}
		return _deviceCode;
	},

	//获取accessToken
	async getAccessToken() {
		if(!_accessToken){
			_accessToken = await storage.get(StorageKeys.DEVICE_CODE);
		}
		return _accessToken;
	}
}