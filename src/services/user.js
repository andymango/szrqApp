import io from './io';
import storage, {StorageKeys} from '../libs/storage'

let _userInfo = null;
export default {
	//获取用户信息
	getUserInfo() {
		let config = {
			method: 'get',
			url: '/system/data/enterlimit',
			testUrl: '/json/userInfo.json'
		};

		return io(config);
	},

	//获取本地缓存的用户信息
	async getLocalUserInfo(){
		if(!_userInfo){
			let data = await getUserInfo();
			if(data.code === 1){
				_userInfo = data.object;
			}
		}
		return _userInfo;
	},

	//登录
	async login(data) {
		let config = {
			method: 'post',
			url: '/home/index',
			testUrl: '/json/userInfo.json',
			data: data
		};

		let resData = await io(config);

		if(resData.code === 1){
			await storage.set(StorageKeys.USER_INFO, resData.object);
		}
		return resData;
	},

	//退出登录
	logout() {
		let config={
			method:'post',
			testUrl: '/json/userInfo.json'
		}
		return io(config).then(data => {
			if(data.code === 1){
				_userInfo = null;
				storage.delete(StorageKeys.USER_INFO);
			}
			return data;
		});
	}
}