/**
 * @author AshaLiu
 * 统一路由配置
 */

import GConfig from '@/config';

let routers = [
	{

		path: '/common',
		children: [
			{
				path: '/demo',
				params: 'id', //路由参数，约定是以问号结尾，要在此备注说明
				component: require('views/Home'),
				meta: {
					hasVisitorPermis: 1, // 0表示没有游客权限 1表示有游客权限
				},
				// isShowLoading: true,
				comp: {
					"2.0.0": {
						component: require('views/DemoList')
					}
				},
			},
			{
				path: '/demoList',
				component: require('views/DemoList')
			}
		]
	},
	{
		path: '/common',
		children: [{
			path: '/carDetail',
			component: require('views/carDetail')
		}
		]
	},
	{
		path: '/common',
		children: [
			{
				path: '/app',
				component: require('views/App')
			}
		]
	},
	{
		path: '/common',
		children: [
			{
				path: '/preload',
				component: require('views/Preload.js')
			}
		]
	}
];

/**
 * 获取想要的routers
 * @param routers  数组
 * @param oParent  父亲
 */
// 默认的额外的杂七杂八的参数
let oDefaultMeta = {
	hasVisitorPermis: 1
};
let oNewRouters = [];//弄起来自己注册用
let oNativeRouters = {};//弄起来传递给服务
function getRouter(routers, oParent = {path: ''}) {
	routers.forEach(oItem => {
		let currRoute = {};
		currRoute.path = oParent.path + oItem.path;
		currRoute.component = oItem.component || null;
		currRoute.meta = Object.assign({}, oDefaultMeta, oItem.meta);

		if (oItem.comp) {
			let oComp = oItem.comp;
			for (let key in oComp) {
				if (GConfig.appVersion >= key) {
					currRoute.component = oComp[key].component;
				}
			}
			delete oItem.comp;
		}

		if (oItem.children) {
			getRouter(oItem.children, currRoute);
		} else {
			oNewRouters.push(currRoute);

			oNativeRouters[currRoute.path] = {
				"hasVisitorPermis": currRoute.meta.hasVisitorPermis
			}
		}
	});
}
getRouter(routers);

export {
	oNewRouters,
	oNativeRouters
};