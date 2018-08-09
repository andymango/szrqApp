import React from 'react'
import { Provider } from 'react-redux'
import RootContainer from './router'
// import createStore from './redux'

// const store = createStore()
import {
	View,
	StatusBar,
	Platform,
	Text,
	NativeModules,
	NativeEventEmitter
  } from 'react-native'

export default class App extends React.Component {
  componentDidMount() {
  }

  state = {
	statusBar:{
		animated: true,//进行设置当状态栏的状态发生变化的时候是否需要加入动画。当前该动画支持
		hidden: false,//进行设置状态栏是否隐藏
		backgroundColor: 'green',//仅支持Android设备，设置状态栏的背景颜色
		translucent:false,//仅支持Android设备, 进行设置状态栏是否为透明。当状态栏的值为true的时候，应用将会在状态栏下面进行绘制显示。这样在Android平台上面就是沉浸式的效果，可以达到Android和iOS应用一致性效果。该值常常配置半透明效果的状态栏颜色一起使用
		barStyle:'default',//枚举类型，仅支持iOS设备。进行设置状态栏文字的颜色'default', 'light-content', 'dark-content'
		networkActivityIndicatorVisible:false,//仅支持iOS设备。设置状态栏上面的网络进度加载器是否进行显示
		showHideTransition:'fade'//enum('fade','slide') 枚举类型，仅支持iOS设备。进行设置当隐藏或者显示状态栏的时候的动画效果。默认值为'fade'
	}
  };
  render() {
    return (
	//   <Provider store={store}>
		<View style={{ flex: 1 }}>
		  	<StatusBar
				animated={this.state.statusBar.animated}
				hidden={this.state.statusBar.hidden}
				backgroundColor={this.state.statusBar.backgroundColor}
				translucent={this.state.statusBar.translucent}
				barStyle={this.state.statusBar.barStyle}
				networkActivityIndicatorVisible={this.state.statusBar.networkActivityIndicatorVisible}
				showHideTransition={this.state.statusBar.showHideTransition}
			/>
        	<RootContainer />
		</View>
    //   </Provider>
    )
  }
}
