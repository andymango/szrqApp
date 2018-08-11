/* 持久化本地存储
 * @Author: dongxiaochai@163.com
 * @Date: 2018-08-07 14:09:13
 * @Last Modified by: dongxiaochai@163.com
 * @Last Modified time: 2018-08-10 17:15:32
 */
import {AsyncStorage} from 'react-native';
//存储的键值
export const StorageKeys = {
	IS_LANUCH_YET: 'IS_LANUCH_YET',
	DEVICE_CODE: 'DEVICE_CODE',
	ACCESS_TOKEN: 'ACCESS_TOKEN',
	USER_INFO: 'USER_INFO', //用户信息
}

const storage = {
	//存持久化数据
	async set(key, val){
		if(val === null){
			return AsyncStorage.removeItem(key);
		}

		let parseData = JSON.stringify({
			data: val
		});
		try {
			let aa = await AsyncStorage.setItem(key, parseData);
		} catch (error) {
			// Error saving data
		}
		return null;
	},
	//取持久化数据
	async get(key){
		try {
			const value = await AsyncStorage.getItem(key);
			if (value !== null){
				let parseData = JSON.parse(value).data;
			  	return parseData;
			}
			return value;
		  } catch (error) {
			  	return null;
		  }
	},

	//删除数据
	async delete(key){
		await AsyncStorage.removeItem(key);
	},

	async getAllKeys(){
		let allKeys = await AsyncStorage.getAllKeys();

		return allKeys;
	}
}

export default storage;