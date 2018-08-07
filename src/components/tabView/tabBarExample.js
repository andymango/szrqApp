import React , { Component } from 'react';
import {
	View,
	Text,
} from 'react-native';

import ScrollableTabView, {
	DefaultTabBar
} from 'react-native-scrollable-tab-view'
import EStyleSheet from 'react-native-extended-stylesheet'

export default class TabBar extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount () {

	}

	render () {
		return (
			<View style={styles.tabView}>
				<ScrollableTabView
					renderTabBar={() => <DefaultTabBar style={styles.tabBar} tabStyle={{paddingBottom: 0}} />}
					tabBarPosition="top"												// tabBar的位置（top/bottom ，默认top）
					initialPage={0}															// 初始展示页面（默认为第0页）
					locked={false}															// 禁用水平拖动以在选项卡之间滚动，默认为false。
					scrollWithoutAnimation={false}							// 在选项卡按下更改选项卡没有动画
					style={styles.tabBox}
					tabBarBackgroundColor="#fff"												// 默认选项卡栏背景的颜色，默认为白色
					tabBarUnderlineStyle={styles.tabBarUnderlineStyle}	// 默认选项卡栏的下划线样式。
					tabBarActiveTextColor="red"													// 被选中时默认选项卡栏文本的颜色，默认为navy
					tabBarInactiveTextColor="#000"											// 未选中默认选项卡栏文本的颜色，默认为black
					tabBarTextStyle={styles.textStyle}									// 标签栏文本的其他样式
					// onChangeTab={																// 在选项卡更改时调用，接受1个参数（i：所选标签的索引，ref：所选标签的引用）
					// 	(tab) => {
					// 		// console.log(tab.i, tab.ref);
					// 	}
					// }
					// onScroll={																	// 在页面滑动时调用（横向），接受1个参数，该参数是表示幻灯片中页面位置的浮点数
					// 	(position) => {
					// 		// console.log(position);
					// 	}
					// }
				>
					<View
						tabLabel="tab1"
						style={styles.tabItem}
					>
						<Text>tab1</Text>
					</View>
					<View
						tabLabel="tab2"
						style={styles.tabItem}
					>
						<Text>tab2</Text>
					</View>
				</ScrollableTabView>
			</View>
		)
	}
}

const styles = EStyleSheet.create({
	tabView: {
		flex: 1,
	},
	tabBox: {
		flex: 1,
	},
	tabBar:{
		height: 40,
		borderBottomWidth: 0.5,
		borderBottomColor: '#999',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	tabItem: {
		flex: 1,
	},
	tabBarUnderlineStyle:{
		height:2,
		// width:55,
		backgroundColor: '$red',
	},
	textStyle: {
		fontFamily: 'PingFangSC-Regular',
		fontSize: 17,
		fontWeight: 'normal',
	}
});