import React, { Component } from 'react';
import {
	View,
	Text,
	Alert,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet'
import {getCarList, getHomeConfig} from "../services/homeService";
import DataList from '../components/carList/DataList';
import CarItem from '../components/carList/CarItem';
import LoadMore from '../components/carList/LoadMore';
import btPage from "../libs/btPage";
import Header from "../components/common/Header";
import {deviceH} from 'framework/utils.js';
import TabBar from "../components/tabView/tabBarExample2"

import ScrollableTabView, {
	DefaultTabBar
} from 'react-native-scrollable-tab-view'

export default class DemoList extends Component {
	constructor (props) {
		super(props);
		this.state = {
			carList: [],
			isShowDownLoad: false,
			showToTop: false,
			// tabObject: []
		};
		this.isInit = false;
		this.currentPage = 0;
		this.pageSize = 20;
		this.itemHeight = 115;
		this.loadMorePosition = 0.1;
		this._flatList = null;
		this.itemKey = 'carID';
		this.isLoading = false;
		this.getCarListFn = this.getCarListFn.bind(this);
	}

	// 回到顶部
	toScrollTop = () => {
		this._flatList.scrollToIndex({
			animated: true,
			index: 0
		});

		if (this.state.showToTop) {
			this.setState({
				showToTop: false
			})
		}

	};

	// FlatList的滚动监听事件（官方文档未明确指出，看Issues有人提出）
	onScroll = (event) => {
		// console.log(event.nativeEvent.contentOffset.y);	// 没错，就是这玩意，滚动的距离
		let scrollHeight = event.nativeEvent.contentOffset.y;
		if (scrollHeight > (deviceH * 3 / 4) && !this.state.showToTop) {
			this.setState({
				showToTop: true
			})
		}
		if (scrollHeight < (deviceH * 3 / 4) && this.state.showToTop) {
			this.setState({
				showToTop: false
			})
		}
	};

	// 响应carItem点击事件（data为数据项，index为索引）
	clickCarItem = (data, index) => {
		console.log(data, index);
	};

	// 需要遍历的item
	_renderItem = (data) => {
		return (
			<CarItem carData={data.item} handle={this.clickCarItem.bind(this, data.item, data.index)} />
		)
	};

	// 列表头部组件
	_renderListHeadComponent = () => {
		return (
			<View style={{height: 50,backgroundColor: 'red'}}>
				<Text style={{height: 50,lineHeight: 50,fontSize: 15}}>头部组件</Text>
			</View>
		)
	};

	// 列表的底部组件
	_renderListFootComponent = () => {
		return (
			<LoadMore LoadMoreText="努力加载中..." type="3" />
		)
	};

	// 列表无数据时的空列表组件
	_renderEmptyComponent = () => {
		return (
			<View>
				<Text>暂无数据！</Text>
			</View>
		)
	};

	// 获取列表自身，以便操作列表（例如：一键回到顶部）
	_getFlatSelf = (flatList) => {
		this._flatList = flatList;
	};

	// 列表刷新方法
	_refresh = () => {
		// console.log(123);
		this.currentPage = 0;


		this.setState({
			isShowDownLoad: true
		});
		// this.state.carList = [];
		this.getCarListFn(() => {
			this.setState({
				isShowDownLoad: false
			})
		});

	};

	// tab切换
	 async _onChangeTab(tab) {
	 	if (tab.i === 1 && !this.isInit) {
			this.getCarListFn();
			return;
		}
		let data = await getHomeConfig({
			enterValues: 1
		});
		console.log(`tab切换到第${tab.i + 1}页，发起请求${JSON.stringify(data)}`);
	};

	// 请求列表方法
	getCarListFn = (callback) => {
		if (this.isLoading) return;
		this.isLoading = true;
		let o = {
			currentPage: this.currentPage,
			pageSize: this.pageSize,
		};
		console.log('load more');
		//setTimeout(() => {
			getCarList(o).then(
				(data) => {
					if (this.currentPage === 0) {
						this.state.carList = [];
					}
					this.isInit = true;
					this.isLoading = false;
					this.currentPage ++;
					this.setState({
						carList: [...this.state.carList, ...data.object]
					}, () => {
						console.log(this.state.carList);
					});
					callback && callback();
				}
			)
		//}, 1500);
	};

	componentWillMount () {

	}

	componentDidMount() {
		// 获取车辆列表
		// this.getCarListFn();
	}

	render () {
		return (
			<View style={styles.carListContainer}>
				<Header
					title="车辆列表header"
					navigation={this.props.navigation}
					backgroundColor="#fff"
					leftClick={() => btPage.goBack({
						args: 2
					})}
				/>
				{/*<TabBar />*/}
				<View style={styles.tabView}>
					<ScrollableTabView
						renderTabBar={() => <DefaultTabBar style={styles.tabBar} tabStyle={{paddingBottom: 0}} />}
						tabBarPosition="top"												// tabBar的位置（top/bottom/overlayTop/overlayBottom ，默认top）
						initialPage={0}															// 初始展示页面（默认为第0页）
						locked={false}															// 禁用水平拖动以在选项卡之间滚动，默认为false。
						scrollWithoutAnimation={false}							// 在选项卡按下更改选项卡没有动画
						style={styles.tabBox}
						tabBarBackgroundColor="#cecece"											// 默认选项卡栏背景的颜色，默认为白色
						tabBarUnderlineStyle={styles.tabBarUnderlineStyle}	// 默认选项卡栏的下划线样式。
						tabBarActiveTextColor="red"													// 被选中时默认选项卡栏文本的颜色，默认为navy
						tabBarInactiveTextColor="#000"											// 未选中默认选项卡栏文本的颜色，默认为black
						tabBarTextStyle={styles.textStyle}									// 标签栏文本的其他样式
						onChangeTab={																// 在选项卡更改时调用，接受1个参数（i：所选标签的索引，ref：所选标签的引用）
							// (tab) => {
							// 	console.log(tab.i, tab.ref);
							// }
							this._onChangeTab.bind(this)
						}
						onScroll={																					// 在页面滑动时调用（横向），接受1个参数，该参数是表示幻灯片中页面位置的浮点数
							(position) => {
								// console.log(position);
							}
						}
					>
						<View
							tabLabel="tab1"
							style={styles.tabItem}
						>
							<Text>123</Text>
						</View>
						<View
							tabLabel="tab2"
							style={styles.tabItem}
						>
							<DataList
								dataList={this.state.carList}
								pullData={this.getCarListFn}
								refresh={this._refresh}
								renderItem={this._renderItem}
								// itemKey={this.itemKey}
								canUpLoad={true}
								canDownLoad={true}
								isNeedSeparator={true}
								itemHeight={this.itemHeight}
								loadMorePosition={this.loadMorePosition}
								getFlatSelf={this._getFlatSelf}
								listHeadComponent={this._renderListHeadComponent}
								listFootComponent={this._renderListFootComponent}
								// emptyComponent={this._renderEmptyComponent}
								onScroll={this.onScroll}
							/>
							{
								this.state.showToTop ?
									<Text style={styles.toTop} onPress={this.toScrollTop}>Top</Text> :
									null
							}

						</View>
						<View
							tabLabel="tab3"
							style={styles.tabItem}
						>
							<Text>123</Text>
						</View>
					</ScrollableTabView>
				</View>
			</View>
		)
	}
}

const styles = EStyleSheet.create({
	title: {
		width: '100%',
		height: 50,
		lineHeight: 50,
		textAlign: 'center',
		backgroundColor: '#999',
	},
	carListContainer: {
		flex: 1,
	},
	carList: {
		width: '100%',
	},
	lineColor: {
		height: 1,
		backgroundColor: '$ce8'
	},
	toTop: {
		position: "absolute",
		right: 15,
		bottom: 25,
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '$primaryColorRed',
		color: '$cff',
		fontSize: 14,
		fontWeight: 'bold',
		textAlign: 'center',
		lineHeight: 50,
		zIndex: 10,
		overflow: 'hidden',
	},
	tabView: {
		flex: 1,
	},
	tabBox: {
		flex: 1,
		height: 40
	},
	tabBar:{
		height: 40,
		borderBottomWidth: 0.5,
		borderBottomColor: '#999',
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