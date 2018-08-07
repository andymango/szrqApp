/* 持久化本地存储
 * @Author: dongxiaochai@163.com
 * @Date: 2018-08-07 14:09:13
 * @Last Modified by: dongxiaochai@163.com
 * @Last Modified time: 2018-08-07 14:28:39
 */
import {AsyncStorage} from 'react-native';

Object.assign(storage, {
	//存持久化数据
	async setItem(key, val){
		if(val === null){
			return AsyncStorage.removeItem(key);
		}

		let parseData = JSON.stringify({
			data: val
		});
		try {
			await AsyncStorage.setItem(key, parseData);
		} catch (error) {
			return null;
			// Error saving data
		}
	},
	//取持久化数据
	async getItem(key){
		try {
			const value = await AsyncStorage.getItem(key);
			if (value !== null){
				let parseData = JSON.parse(value).data;
			  	// We have data!!
			  	return parseData;
			}
			return value;
		  } catch (error) {
			  	return null;
				// Error retrieving data
		  }
	}
})

export default storage;