import Axios from 'axios';
import GConfig from '../config';
// import networkModule from "../libs/nativeBridge/networkModule";
import Util from "../libs/utils";
import qs from 'qs';
import {Say, Loading, Confirm} from '@/libs/btOverlay';
// import systemService from '@/services/system'

const hostPrefix = GConfig.API_PREFIX || '';
Axios.defaults.headers.common['version'] = GConfig.appVersion;

export default function io(config) {
	Axios.defaults.headers.common['deviceCode'] = global.deviceCode;
	Axios.defaults.headers.common['accessToken'] = global.accessToken;
	// 删除空字段
	if (config.data) {
		for (let key in config.data) {
			if (config.data[key] === null || config.data[key] === undefined || config.data[key] === 'undefined' || config.data[key] === '') {
				delete config.data[key];
			}
		}
	}

	if (GConfig.isTest) {
		config.url = config.testUrl;
		if(config.method !== undefined && config.method !== 'get'){
			config.originMethod = config.method;
			config.method = 'get';
		}
	}
	if(!config.url.startsWith('http')){
		config.url = hostPrefix + config.url
	}

	return new Promise((resolve, reject) => {
		let promise;
		if (config.method === 'post') {
			let postData = config.data;
			if(config.data && config.isFormData !== true){//如果传进来本身已经是formdata，不要进行转化
				postData = qs.stringify(config.data);
			}
			promise = Axios.post(config.url, postData)
		} else {
			promise = Axios.get(config.url, {
				params: config.data || config.params
			})
		}

		promise.then((result) => {
			result = Util.parseData(result.data);
			if (result.code && (result.code === 1000)) {
				Loading.hide();
				console.log('需要用户登录');//这里需要跳转到登录、导航没托管状态管理这里暂时不好搞
			} else{
				resolve(result);
			}
		}, err => {
			//log mark
			resolve({
				code: -1,
				message: '请求错误'
			});
		})
	})
}
