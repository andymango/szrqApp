import io from './io';
import storage, {StorageKeys} from '../libs/storage'

//获取用户信息
export function getUserInfo() {
	let config = {
		method: 'get',
		url: '/system/data/enterlimit',
		testUrl: '/json/userInfo.json'
	};

	return io(config);
}

//获取本地缓存的用户信息
export function getLocalUserInfo(){

}

//登录
export function login(data) {
	let config = {
		method: 'post',
		url: '/home/index',
		testUrl: '/json/userInfo.json',
		data: data
	};

	return io(config).then(data => {
		if(data.code === 1){
			storage.set(StorageKeys.ACCESS_TOKEN, data.object.accessToken);
		}
		return data;
	});
}

//退出登录
export function logout() {
	let config={
		method:'post',
		testUrl: '/json/userInfo.json'
	}
	return io(config).then(data => {
		if(data.code === 1){
			storage.delete(StorageKeys.ACCESS_TOKEN);
		}
		return data;
	});
}