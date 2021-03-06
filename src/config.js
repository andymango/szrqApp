/**
 * GConfig 变量为总应用命名空间
 * Created by AshaLiu
 */

// if(!global.appVersion){
// 	let systemModule = require('framework/nativeBridge/systemModule');
// 	console.log(systemModule);
// 	systemModule.default.getAppVersion(function (sVersion) {
// 		global.appVersion = sVersion;
// 		config.appVersion = sVersion;
// 	});
// }
let DEFAULT_CONFIG = {

	isTest: false,

	pageSize: 20,

	appVersion: '1.0.0',

	schemeUrl: 'szrq://www.szrq.com',

	/**
	 * 应用跳转前缀
	 * @type {String}
	 */
	APP_PAGE_PREFIX: "szrq://www.szrq.com",

	//接口访问前缀
	API_PREFIX: "http://localhost:8081",

	//下载页访问地址
	DOWNLOAD_URL: 'http://www.baidu.com'
};
let env = "production";

let envConfig = {
	development: {
		isTest: true,
	},
	production: {}
};

let config = Object.assign({}, DEFAULT_CONFIG);

if (__DEV__) {
	// debug模式
	env = "development"
} else {
	// release模式
	env = "production"
}

Object.assign(config, envConfig[env]);

global.GConfig = config;

export default config
