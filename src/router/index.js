// import React, {Component} from 'react';
import GConfig from '@/config';
import {
	createSwitchNavigator,
	createStackNavigator,
	// createMaterialTopTabNavigator,
	// createBottomTabNavigator,
	addNavigationHelpers
} from 'react-navigation';

import WelcomePageScreen from  '@/views/WelcomePage';
import MainScreen from  '@/views/Main';
import LoginScreen from '@/views/Account/Login';
import ModifyPwdScreen from '@/views/Mine/ModifyPwd';
import DemoScreen from '@/views/Demo'
import createLinkingAwareContainer from './deepLinking'

let routeConfig = {};
function getRouteConfig(routes, navigator){
	for(let key in routes){
		if(routes[key].path){
			routeConfig[routes[key].path] = navigator.router.getActionForPathAndParams(routes[key].path)
		}
	}
	return navigator;
}

export default function(props){
	let stackRoutes = {
		index: {
			screen: MainScreen,
			path: "/index"
		},
		modifyPwd: {
			screen: ModifyPwdScreen,
			path: "/modifyPwd"
		},
		login1: {
			screen: LoginScreen,//require('@/views/Login'),
			path: "/login1",
			navigationOptions: {
				mode: 'modal'
			}
		},
		demo: {
			screen: DemoScreen,
			path: "/demo"
		}
	};
	let MainStack = getRouteConfig(stackRoutes, createStackNavigator(stackRoutes, {
		resetOnBlur: true,//切换离开屏幕时，重置所有嵌套导航器的状态。默认为true
		initialRouteName: 'index',
		// initialRouteParams: {},
		navigationOptions: {//默认导航选项
			// header: null,
			// title: "标题",
			headerBackTitle: '返回',
			headerTruncatedBackTitle: '返回',
			gesturesEnabled: true //是否支持滑动返回手势，iOS默认支持，安卓默认关闭
		}}
	));

	MainStack = createLinkingAwareContainer(MainStack, routeConfig)

	let switchRoutes = {
		welcomePage: {
			screen: WelcomePageScreen,
			path: "/welcomePage"
		},
		main: {
			screen: MainStack,
			path: "/"
		},
		login: {
			screen: LoginScreen,//require('@/views/Login'),
			path: "/login"
		}
	}

	let RootNavigator = createSwitchNavigator(switchRoutes, {
		initialRouteName: props.screenProps.defaultRoute,
		resetOnBlur: true //切换离开屏幕时，重置所有嵌套导航器的状态。默认为true
	})
	// console.log('111', MainStack.router.getActionForPathAndParams('/modifyPwd'), MainStack.router)
	// console.log('222', RootNavigator.router.getActionForPathAndParams('/login'), MainStack.router)
	// getRouteConfig(stackRoutes, MainStack);
	// getRouteConfig(switchRoutes, RootNavigator);
	console.log(routeConfig, MainStack)


// let DeepLinkingStack = createLinkingAwareContainer(MainStack, GConfig.APP_PAGE_PREFIX)


	return new RootNavigator(props);
};

// /**
//  * 获取想要的routers
//  * @param routers  数组
//  * @param oParent  父亲
//  */
// // 默认的额外的杂七杂八的参数
// let oDefaultMeta = {
// 	hasVisitorPermis: 1
// };
// let oNewRouters = [];//弄起来自己注册用
// let oNativeRouters = {};//弄起来传递给服务
// function getRouter(routers, oParent = {path: ''}) {
// 	routers.forEach(oItem => {
// 		let currRoute = {};
// 		currRoute.path = oParent.path + oItem.path;
// 		currRoute.component = oItem.component || null;
// 		currRoute.meta = Object.assign({}, oDefaultMeta, oItem.meta);

// 		if (oItem.children) {
// 			getRouter(oItem.children, currRoute);
// 		} else {
// 			oNewRouters.push(currRoute);

// 			oNativeRouters[currRoute.path] = {
// 				"hasVisitorPermis": currRoute.meta.hasVisitorPermis
// 			}
// 		}
// 	});
// }
// getRouter(routers);

// export {
// 	oNewRouters,
// 	oNativeRouters
// };
