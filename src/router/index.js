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

let mainNavigator = createStackNavigator({
	index: {
		screen: MainScreen,
		path: "/index"
	}
}, {
	initialRouteName: 'index',
	// initialRouteParams: {},
    navigationOptions: {//默认导航选项
      	headerBackTitle: '返回',
      	headerTruncatedBackTitle: '返回',
      	gesturesEnabled: true //是否支持滑动返回手势，iOS默认支持，安卓默认关闭
	}});

let rootNavigator = createSwitchNavigator({
		welcomePage: {
			screen: WelcomePageScreen,
			path: "/welcomePage"
		},
		main: {
			screen: mainNavigator,
			path: "/"
		},
		login: {
			screen: LoginScreen,//require('@/views/Login'),
			path: "/login"
		}
	}, {
	initialRouteName: 'welcomePage',
    // headerMode: 'none',
	// initialRouteParams: {},
    navigationOptions: {//默认导航选项
    	header: null,
      	gesturesEnabled: false //是否支持滑动返回手势，iOS默认支持，安卓默认关闭
    },
    // transitionConfig: TransitionConfiguration
})
export default rootNavigator;

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
