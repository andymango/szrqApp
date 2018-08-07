import React, { Component } from 'react';
import {
	Animated,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
	Dimensions
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Carousel from './react-native-looped-carousel'; // 这里直接把这个插件复制进来了，感觉有些还是自己来操作的好

const { width, height } = Dimensions.get('window');
const DEFAULT_CONFIG = {
	autoplay: true,   // boolean 是否自动轮播
	delay: 4000,  		// number 多少毫秒切换一次
	currentPage: 0,		// number 设置初始页
	pageStyle: null,  // style 页面的样式
	contentContainerStyle: null,  // style 内容容器样式
	onAnimateNextPage: null, 			// func 切换轮播图时的回调方法 参数为当前页面的ID
	onPageBeingChanged: null,			// func 切换轮播图时的回调方法 参数为当前页面的ID 比onAnimateNextPage稍晚
	swipe: true,			// boolean 是否允许手势滑动也换页面
	isLooped: true, 	// boolean 是否可以无限滚动
	/*** 分页 ***/
	pageInfo: false,	// boolean 是否在底部显示当前页面下标 / 页面个数
	pageInfoBackgroundColor: 'rgba(0, 0, 0, 0.25)',		// string 分页的背景色
	pageInfoBottomContainerStyle: null, // style pageInfo容器的样式
	pageInfoTextStyle: null,						// style pageInfo中的文本样式
	pageInfoTextSeparator: ' / ',					// string 在 当前页面下标 和 页面个数之间的分隔符
	/*** 小圆点 ***/
	bullets: false,								// boolean 是否在轮播的底部显示小圆点
	bulletStyle: null,						// style bullet（小圆点）的样式
	bulletsContainerStyle: null,  // style 小圆点容器的样式
	chosenBulletStyle: null,			// style 被选中的小圆点的样式
	/*** 导航箭头 ***/
	arrows: false,								// boolean 是否显示轮播的导航箭头
	arrowsStyle: null,  					// style 导航箭头的样式
	arrowsContainerStyle: null,		// style 导航箭头的容器样式
	leftArrowText: 'Left',				// string/element 左箭头的文字或图片
	rightArrowText: 'Right',			// string/element 右箭头的文字或图片
	leftArrowStyle: null,					// style 左箭头的样式
	rightArrowStyle: null,				// style 右箭头的样式
};

export default class Banner extends Component {
	/**
	 * props参数
	 * boxStyle： style 包裹轮播的View的样式
	 * imgList: list 图片数组，要轮播的图片
	 * imgStyle: style 图片样式
	 * fnOnPress: func 点击图片时要执行的函数
	 * config: 给轮播插件的配置
	 * */
	constructor(props) {
		super(props);

		this.state = {
			imgList: this.props.imgList,
			size: { width, height },
			boxStyle: this.props.boxStyle ,
			imgDefaultStyle: !!this.props.imgStyle ? this.props.imgStyle : styles.imgDefaultStyle ,
		};

		Object.assign(this.oConfig, DEFAULT_CONFIG, this.props.config);

		this._onLayoutDidChange = this._onLayoutDidChange.bind(this);
	}
	oConfig = {};

	_onLayoutDidChange = e => {
		const layout = e.nativeEvent.layout;
		this.setState({ size: { width: layout.width, height: layout.height } });
	};
	pagePress = () => {
		this.props.fnOnPress && this.props.fnOnPress();
	};

	render() {

		return (
			<View
				style={this.state.boxStyle}
				onLayout={this._onLayoutDidChange}>

				<Carousel
					style={this.oConfig.pageStyle}
					{...this.oConfig}>
					{
						this.state.imgList.map((imgUri, index) => (
							<TouchableWithoutFeedback key={index} onPress={this.pagePress}>
								<View>
									<Image
										style={this.state.imgDefaultStyle}
										source={{uri: imgUri.url}}
										resizeMode={"cover"} />
								</View>
							</TouchableWithoutFeedback>
						))
					}
				</Carousel>

			</View>
		);
	}
}

const styles = EStyleSheet.create({
	wholeBannerBox: {
		width: width,
		height: height,
		position: "absolute",
		top: 0,
		left: 0,
	},
	wholeBannerBg: {
		width: width,
		height: height,
		position: "absolute",
		top: 0,
		left: 0,
		backgroundColor: "#000",
	},
	imgDefaultStyle: {
		width: width,
		height: 200,
	},
});