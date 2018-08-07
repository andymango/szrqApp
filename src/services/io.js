import Axios from 'axios';
import GConfig from '../config';
// import networkModule from "../libs/nativeBridge/networkModule";
import Util from "../libs/utils";
import qs from 'qs';

const hostPrefix = GConfig.API_PREFIX || '';

// Axios.defaults.headers.common['AccessToken'] = '3d55682dfdcf4315efdcdb2c4e07b4dd'
// Axios.defaults.headers.common['deviceToken'] = 'abc'
// Axios.defaults.headers.common['version'] = GConfig.version;

export default function io(config) {
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

	let errorReturn = {
		code: 0,
		message: '请求失败'
	};

	let promise;
	if (config.method === 'post') {
		let postData = config.data;
		if(config.data && config.isFormData !== true){//如果传进来本身已经是formdata，不要进行转化
			postData = qs.stringify(config.data);
		}
		promise = Axios.post(config.url, postData).then((result) => {
			resolve(result.data)
			// resolve(result.data);
		}, (err) => {
			reject(errorReturn);
		})
	} else {
		promise = Axios.get(config.url, {
			params: config.data || config.params
		}).then((result) => {
			resolve(result.data)
		}, (err) => {
			reject(errorReturn);
		})
	}
	
	return promise.then((result) => {
		result = Util.parseData(result);

		if (result.code && (result.code === 402 || result.code === 401)) {
			console.log('需要用户登录');
		}

		return result
	})
}
