/* 系统服务
 * @Author: dongxiaochai@163.com
 * @Date: 2018-08-08 13:59:10
 * @Last Modified by: dongxiaochai@163.com
 * @Last Modified time: 2018-08-08 16:42:10
 */

import io from './io';
import storage, {StorageKeys} from '@/libs/storage'
import deviceInfo from 'react-native-device-info'

//获取系统设备信息
export async function getDeviceCode() {
	// deviceInfo.getMACAddress();
	//md5
	return await storage.get(StorageKeys.ACCESS_TOKEN);
}