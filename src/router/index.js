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

let mainNavigator = createStackNavigator({
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
	}
}, {
	resetOnBlur: true,//切换离开屏幕时，重置所有嵌套导航器的状态。默认为true
	initialRouteName: 'index',
	// initialRouteParams: {},
	navigationOptions: {//默认导航选项
    	// header: null,
		// title: "标题",
      	headerBackTitle: '返回',
      	headerTruncatedBackTitle: '返回',
      	gesturesEnabled: true //是否支持滑动返回手势，iOS默认支持，安卓默认关闭
	}});

export default function(props){
	let RootNavigator = createSwitchNavigator({
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
		initialRouteName: props.screenProps.defaultRoute,
		resetOnBlur: true //切换离开屏幕时，重置所有嵌套导航器的状态。默认为true
	})

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
