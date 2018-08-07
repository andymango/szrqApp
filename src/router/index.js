// import React, {Component} from 'react';
import GConfig from '@/config';
import { 
	StackNavigator,
	// TabNavigator,
	// TabBarBottom,
	addNavigationHelpers
} from 'react-navigation';

import { TabBar } from 'antd-mobile'
// import {
// 	View,
// 	StatusBar,
// 	Platform,
// 	Text,
// 	NativeModules,
// 	NativeEventEmitter
//   } from 'react-native'

// export default class App extends React.Component {
//   componentDidMount() {
//   }

//   render() {
//     return (
// 	//   <Provider store={store}>
// 		<View style={{ flex: 1, backgroundColor: 'green' }}>
// 		<Text>router</Text>
// 		</View>
//     //   </Provider>
//     )
//   }
// }

// const TransitionConfiguration = () => ({
// 	screenInterpolator: (sceneProps) => {
// 	  const { scene } = sceneProps;
// 	  const { route } = scene;
// 	  const params = route.params || {};
// 	  const transition = params.transition || 'forHorizontal';
// 	  return CardStackStyleInterpolator[transition](sceneProps);
// 	},
//   })

// //首页的tab控制器
// const tabConfigs = {
// 	home: {
// 		screen: require('@/views/Home'),
// 		path: "/main/home"
// 	},
// 	mine: {
// 		screen: require('@/views/Mine'),
// 		path: "/main/mine"
// 	}
// };

// const Tab = TabNavigator(tabConfigs, 
// 	{
// 		tabBarComponent: TabBarBottom,
// 		tabBarPosition: 'bottom',
// 		swipeEnabled:false,
// 		animationEnabled:false,
// 		lazy:true,
// 		tabBarOptions:{
// 			activeTintColor:'#06c1ae',
// 			inactiveTintColor:'#979797',
// 			style:{backgroundColor:'#ffffff',},
// 			labelStyle: {
// 				fontSize: 20, // 文字大小
// 			},
// 		}
// 	}
// );
import MainScreen from  '@/views/Main';
import LoginScreen from '@/views/Login';

const routeConfigs = {
	main: {
		screen: MainScreen,//require('@/views/Main'),  import ( /* webpackChunkName: "common" */ '@/views/common/index')
		path: "/main"
	},
	login: {
		screen: LoginScreen,//require('@/views/Login'),
		path: "/login"
	}
}
export default StackNavigator(routeConfigs, {
	initialRouteName: 'main',
	// initialRouteParams: {},
    navigationOptions: {
      	headerBackTitle: '返回',
      	headerTruncatedBackTitle: '返回',
      	gesturesEnabled: true //是否支持滑动返回手势，iOS默认支持，安卓默认关闭
    },
    // transitionConfig: TransitionConfiguration
})


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
