var __rest = (this && this.__rest) || function (s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
		t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function")
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
			t[p[i]] = s[p[i]];
	return t;
};
import * as React from "react";
import {
	Animated,
	CameraRoll,
	I18nManager,
	Image,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	Easing
} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import styles, {simpleStyle} from "./image-viewer.style";
import Header from 'components/common/Header'
import {Props, State} from "./image-viewer.type";

const CHANGE_TIME = 200;
export default class ImageViewer extends React.Component {
	constructor() {
		super(...arguments);
		this.state = new State();
		this.state = new State();
		// 背景透明度渐变动画
		this.fadeAnim = new Animated.Value(0);
		// 头部渐入渐出动画
		this.slideIn = new Animated.Value(0);
		this.isShowHead = true;
		// 标题透明度渐变动画
		this.fadeTitle = new Animated.Value(1);
		this.isShowTitle = true;
		// 尾部渐入渐出动画
		this.slideFooter = new Animated.Value(0);
		this.isShowFooter = true;
		this.footerHeight = this.props.footerHeight || 0;
		// 当前基准位置
		this.standardPositionX = 0;
		// 整体位移，用来切换图片用
		this.positionXNumber = 0;
		this.positionX = new Animated.Value(0);
		this.width = 0;
		this.height = 0;
		this.styles = styles(0, 0, "transparent");
		// 是否执行过 layout. fix 安卓不断触发 onLayout 的 bug
		this.hasLayout = false;
		// 记录已加载的图片 index
		this.loadedIndex = new Map();
		this.handleLongPressWithIndex = new Map();
		/**
		 * 触发溢出水平滚动
		 */
		this.handleHorizontalOuterRangeOffset = (offsetX) => {
			this.positionXNumber = this.standardPositionX + offsetX;
			this.positionX.setValue(this.positionXNumber);
			const offsetXRTL = !I18nManager.isRTL ? offsetX : -offsetX;
			if (offsetXRTL < 0) {
				if (this.state.currentShowIndex ||
					0 < this.props.imageUrls.length - 1) {
					this.loadImage((this.state.currentShowIndex || 0) + 1);
				}
			}
			else if (offsetXRTL > 0) {
				if (this.state.currentShowIndex || 0 > 0) {
					this.loadImage((this.state.currentShowIndex || 0) - 1);
				}
			}
		};
		/**
		 * 手势结束，但是没有取消浏览大图
		 */
		this.handleResponderRelease = (vx) => {
			const vxRTL = I18nManager.isRTL ? -vx : vx;
			const isLeftMove = I18nManager.isRTL
				? this.positionXNumber - this.standardPositionX <
				-(this.props.flipThreshold || 0)
				: this.positionXNumber - this.standardPositionX >
				(this.props.flipThreshold || 0);
			const isRightMove = I18nManager.isRTL
				? this.positionXNumber - this.standardPositionX >
				(this.props.flipThreshold || 0)
				: this.positionXNumber - this.standardPositionX <
				-(this.props.flipThreshold || 0);

			if (vxRTL > 0.7) {
				// 上一张
				this.goBack.call(this);
				// 这里可能没有触发溢出滚动，为了防止图片不被加载，调用加载图片
				if (this.state.currentShowIndex || 0 > 0) {
					this.loadImage((this.state.currentShowIndex || 0) - 1);
				}
				return;
			}
			else if (vxRTL < -0.7) {
				// 下一张
				this.goNext.call(this);
				if (this.state.currentShowIndex || 0 < this.props.imageUrls.length - 1) {
					this.loadImage((this.state.currentShowIndex || 0) + 1);
				}
				return;
			}

			if (isLeftMove) {
				// 上一张
				this.goBack.call(this);
			}
			else if (isRightMove) {
				// 下一张
				this.goNext.call(this);
				return;
			}
			else {
				// 回到之前的位置
				this.resetPosition.call(this);
				return;
			}
		};
		this.getChangeTime = (positionNow, positionTarget) => {
			let distance = Math.abs(positionTarget - JSON.stringify(positionNow));
			let flipThreshold = this.props.flipThreshold ? this.props.flipThreshold : distance;
			return (distance/flipThreshold) * CHANGE_TIME;
		};
		/**
		 * 到上一张
		 */
		this.goBack = () => {
			if (this.state.currentShowIndex === 0) {
				// 回到之前的位置
				this.resetPosition.call(this);
				return;
			}
			this.positionXNumber = !I18nManager.isRTL
				? this.standardPositionX + this.width
				: this.standardPositionX - this.width;

			this.standardPositionX = this.positionXNumber;
			let changeTime = this.getChangeTime(this.positionX, this.positionXNumber);
			Animated.timing(this.positionX, {
				toValue: this.positionXNumber,
				duration: changeTime,
				useNativeDriver: true,
			}).start(() => {
				const nextIndex = (this.state.currentShowIndex || 0) - 1;
				this.setState({
					currentShowIndex: nextIndex
				}, () => {
					if (this.props.onChange) {
						this.props.onChange(this.state.currentShowIndex);
					}
				});
			});
		};
		/**
		 * 长按
		 */
		this.handleLongPress = (image) => {
			if (this.props.saveToLocalByLongPress) {
				// 出现保存到本地的操作框
				this.setState({isShowMenu: true});
			}
			if (this.props.onLongPress) {
				this.props.onLongPress(image);
			}
		};
		/**
		 * 单击
		 */
		this.handleClick = () => {
			if (this.props.onClick) {
				this.props.onClick(this.handleCancel);
			}
			this.toggleHeader();
			this.toggleTitle();
			this.toggleFooter();
		};
		/**
		 * 双击
		 */
		this.handleDoubleClick = () => {
			if (this.props.onDoubleClick) {
				this.props.onDoubleClick(this.handleCancel);
			}
		};
		/**
		 * 退出
		 */
		this.handleCancel = () => {
			this.hasLayout = false;
			if (this.props.onCancel) {
				this.props.onCancel();
			}
		};
		/**
		 * 完成布局
		 */
		this.handleLayout = (event) => {
			if (event.nativeEvent.layout.width !== this.width) {
				this.hasLayout = true;
				this.width = event.nativeEvent.layout.width;
				this.height = event.nativeEvent.layout.height;
				this.styles = styles(this.width, this.height, this.props.backgroundColor || "transparent");
				// 强制刷新
				this.forceUpdate();
				this.jumpToCurrentImage();
			}
		};
		/**
		 * 保存当前图片到本地相册
		 */
		this.saveToLocal = () => {
			if (!this.props.onSave) {
				CameraRoll.saveToCameraRoll(this.props.imageUrls[this.state.currentShowIndex || 0].url);
				this.props.onSaveToCamera(this.state.currentShowIndex);
			}
			else {
				this.props.onSave(this.props.imageUrls[this.state.currentShowIndex || 0].url);
			}
			this.setState({isShowMenu: false});
		};
		this.handleLeaveMenu = () => {
			this.setState({isShowMenu: false});
		};
		this.handleSwipeDown = () => {
			if (this.props.onSwipeDown) {
				this.props.onSwipeDown();
			}
			this.handleCancel();
		};
	}

	componentWillMount() {
		this.init(this.props);
	}

	componentWillUnmount() {
		// alert("unmount");
		!!this.props.unmountFunc && this.props.unmountFunc();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.index !== this.state.currentShowIndex) {
			this.setState({
				currentShowIndex: nextProps.index
			}, () => {
				// 立刻预加载要看的图
				this.loadImage(nextProps.index || 0);
				this.jumpToCurrentImage();
				// 显示动画
				Animated.timing(this.fadeAnim, {
					toValue: 1,
					duration: 200
				}).start();
			});
		}
	}

	/**
	 * props 有变化时执行
	 */
	init(nextProps) {
		if (nextProps.imageUrls.length === 0) {
			// 隐藏时候清空
			this.fadeAnim.setValue(0);
			return this.setState(new State());
		}
		// 给 imageSizes 塞入空数组
		const imageSizes = [];
		nextProps.imageUrls.forEach(imageUrl => {
			imageSizes.push({
				width: imageUrl.width || 0,
				height: imageUrl.height || 0,
				status: "loading"
			});
		});
		this.setState({
			currentShowIndex: nextProps.index,
			imageSizes
		}, () => {
			// 立刻预加载要看的图
			this.loadImage(nextProps.index || 0);
			this.jumpToCurrentImage();
			// 显示动画
			Animated.timing(this.fadeAnim, {
				toValue: 1,
				duration: 200
			}).start();
		});
	}

	/**
	 * 调到当前看图位置
	 */
	jumpToCurrentImage() {
		// 跳到当前图的位置
		this.positionXNumber = -this.width * (this.state.currentShowIndex || 0);
		this.standardPositionX = this.positionXNumber;
		this.positionX.setValue(this.positionXNumber);
	}

	/**
	 * 加载图片，主要是获取图片长与宽
	 */
	loadImage(index) {
		if (!this.state.imageSizes[index]) {
			return;
		}
		if (this.loadedIndex.has(index)) {
			return;
		}
		this.loadedIndex.set(index, true);
		const image = this.props.imageUrls[index];
		const imageStatus = Object.assign({}, this.state.imageSizes[index]);
		// 保存 imageSize
		const saveImageSize = () => {
			// 如果已经 success 了，就不做处理
			if (this.state.imageSizes[index] &&
				this.state.imageSizes[index].status !== "loading") {
				return;
			}
			const imageSizes = this.state.imageSizes.slice();
			imageSizes[index] = imageStatus;
			this.setState({imageSizes});
		};
		if (this.state.imageSizes[index].status === "success") {
			// 已经加载过就不会加载了
			return;
		}
		// 如果已经有宽高了，直接设置为 success
		if (this.state.imageSizes[index].width > 0 &&
			this.state.imageSizes[index].height > 0) {
			imageStatus.status = "success";
			saveImageSize();
			return;
		}
		// 是否加载完毕了图片大小
		const sizeLoaded = false;
		// 是否加载完毕了图片
		let imageLoaded = false;
		// Tagged success if url is started with file:, or not set yet(for custom source.uri).
		if (!image.url || image.url.startsWith(`file:`)) {
			imageLoaded = true;
		}
		Image.getSize(image.url, (width, height) => {
			imageStatus.width = width;
			imageStatus.height = height;
			imageStatus.status = "success";
			saveImageSize();
		}, error => {
			try {
				const data = Image.resolveAssetSource(image.props.source);
				imageStatus.width = data.width;
				imageStatus.height = data.height;
				imageStatus.status = "success";
				saveImageSize();
			}
			catch (newError) {
				// Give up..
				imageStatus.status = "fail";
			}
		});
	}

	/**
	 * 到下一张
	 */
	goNext() {
		if (this.state.currentShowIndex === this.props.imageUrls.length - 1) {
			// 回到之前的位置
			this.resetPosition.call(this);
			return;
		}
		this.positionXNumber = !I18nManager.isRTL
			? this.standardPositionX - this.width
			: this.standardPositionX + this.width;
		this.standardPositionX = this.positionXNumber;
		let changeTime = this.getChangeTime(this.positionX, this.positionXNumber);
		Animated.timing(this.positionX, {
			toValue: this.positionXNumber,
			duration: changeTime,
			useNativeDriver: true,
		}).start(()=>{
			const nextIndex = (this.state.currentShowIndex || 0) + 1;
			this.setState({
				currentShowIndex: nextIndex
			}, () => {
				if (this.props.onChange) {
					this.props.onChange(this.state.currentShowIndex);
				}
			});
		});
	}

	/**
	 * 回到原位
	 */
	resetPosition() {
		this.positionXNumber = this.standardPositionX;
		Animated.timing(this.positionX, {
			toValue: this.standardPositionX,
			duration: 200,
			useNativeDriver: true,
		}).start();
	}
	/**
	 * 显示/隐藏头部
	 */
	toggleHeader(){
		if(this.isShowHead){
			Animated.timing(this.slideIn, {
				toValue: -45,
				duration: 200
			}).start();
		}else{
			Animated.timing(this.slideIn, {
				toValue: 0,
				duration: 200
			}).start();
		}
		this.isShowHead = !this.isShowHead;
	}
	/**
	 * 显示/隐藏尾部
	 */
	toggleFooter(){
		if(this.isShowFooter){
			Animated.timing(this.slideFooter, {
				toValue: -this.footerHeight,
				duration: 200
			}).start();
		}else{
			Animated.timing(this.slideFooter, {
				toValue: 0,
				duration: 200
			}).start();
		}
		this.isShowFooter = !this.isShowFooter;
	}
	/**
	 * 显示/隐藏标题
	 */
	toggleTitle(){
		if(this.isShowTitle){
			Animated.timing(this.fadeTitle, {
				toValue: 0,
				duration: 200
			}).start();
		}else{
			Animated.timing(this.fadeTitle, {
				toValue: 1,
				duration: 200
			}).start();
		}
		this.isShowTitle = !this.isShowTitle;
	}

	/**
	 * 获得整体内容
	 */
	getContent() {
		// 获得屏幕宽高
		const screenWidth = this.width;
		const screenHeight = this.height;
		const ImageElements = this.props.imageUrls.map((image, index) => {
			if ((this.state.currentShowIndex || 0) > index + 1 ||
				(this.state.currentShowIndex || 0) < index - 1) {
				return (<View key={index} style={{width: screenWidth, height: screenHeight}}/>);
			}
			if (!this.handleLongPressWithIndex.has(index)) {
				this.handleLongPressWithIndex.set(index, this.handleLongPress.bind(this, image));
			}
			let width = this.state.imageSizes[index] &&
				this.state.imageSizes[index].width;
			let height = this.state.imageSizes[index] && this.state.imageSizes[index].height;
			const imageInfo = this.state.imageSizes[index];
			if (!imageInfo || !imageInfo.status) {
				return (<View key={index} style={{width: screenWidth, height: screenHeight}}/>);
			}
			// 如果宽大于屏幕宽度,整体缩放到宽度是屏幕宽度
			if (width > screenWidth) {
				const widthPixel = screenWidth / width;
				width *= widthPixel;
				height *= widthPixel;
			}
			// 如果此时高度还大于屏幕高度,整体缩放到高度是屏幕高度
			if (height > screenHeight) {
				const HeightPixel = screenHeight / height;
				width *= HeightPixel;
				height *= HeightPixel;
			}
			const Wrapper = (_a) => {
				var {children} = _a, others = __rest(_a, ["children"]);
				return (<ImageZoom cropWidth={this.width} cropHeight={this.height} maxOverflow={this.props.maxOverflow}
													 horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset}
													 responderRelease={this.handleResponderRelease}
													 onLongPress={this.handleLongPressWithIndex.get(index)} onClick={this.handleClick}
													 onDoubleClick={this.handleDoubleClick} enableSwipeDown={true}
													 onSwipeDown={this.handleSwipeDown} {...others}>
					{children}
				</ImageZoom>);
			};
			switch (imageInfo.status) {
				case "loading":
					return (
						<Wrapper key={index} style={Object.assign({}, this.styles.modalContainer, this.styles.loadingContainer)}
										 imageWidth={screenWidth} imageHeight={screenHeight}>
							<View style={this.styles.loadingContainer}>
								{this.props.loadingRender()}
							</View>
						</Wrapper>);
				case "success":
					if (!image.props) {
						image.props = {};
					}
					if (!image.props.style) {
						image.props.style = {};
					}
					image.props.style = Object.assign({}, this.styles.imageStyle, image.props.style, {
						width,
						height
					});
					if (typeof image.props.source === "number") {
						// source = require(..), doing nothing
					}
					else {
						if (!image.props.source) {
							image.props.source = {};
						}
						image.props.source = Object.assign({uri: image.url}, image.props.source);
					}
					return (
						<ImageZoom key={index} cropWidth={this.width} cropHeight={this.height} maxOverflow={this.props.maxOverflow}
											 horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset}
											 responderRelease={this.handleResponderRelease}
											 onLongPress={this.handleLongPressWithIndex.get(index)} onClick={this.handleClick}
											 onDoubleClick={this.handleDoubleClick} imageWidth={width} imageHeight={height}
											 enableSwipeDown={true} onSwipeDown={this.handleSwipeDown}>
							{this.props.renderImage(image.props)}
						</ImageZoom>);
				case "fail":
					return (<Wrapper key={index} style={this.styles.modalContainer} imageWidth={this.props.failImageSource
						? this.props.failImageSource.width
						: screenWidth} imageHeight={this.props.failImageSource
						? this.props.failImageSource.height
						: screenHeight}>
						{this.props.failImageSource &&
						this.props.renderImage({
							source: {
								uri: this.props.failImageSource.url
							},
							style: {
								width: this.props.failImageSource.width,
								height: this.props.failImageSource.height
							}
						})}
					</Wrapper>);
			}
		});
		return (<Animated.View style={{zIndex: 9999}}>
			<Animated.View style={Object.assign({}, this.styles.container, {opacity: this.fadeAnim})}>

				<View style={this.styles.arrowLeftContainer}>
					<TouchableWithoutFeedback onPress={this.goBack}>
						<View>{this.props.renderArrowLeft()}</View>
					</TouchableWithoutFeedback>
				</View>

				<View style={this.styles.arrowRightContainer}>
					<TouchableWithoutFeedback onPress={this.goNext}>
						<View>{this.props.renderArrowRight()}</View>
					</TouchableWithoutFeedback>
				</View>

				<Animated.View style={Object.assign({}, this.styles.moveBox, {
					transform: [{translateX: this.positionX}],
					width: this.width * this.props.imageUrls.length
				})}>
					{ImageElements}
				</Animated.View>
				{/*页面倒计时放在头部了，这里暂时用不到*/}
				{/*{this.props.renderIndicator((this.state.currentShowIndex || 0) + 1, this.props.imageUrls.length)}*/}
				{/*头部放在下面，避免被图片遮住*/}
				{/*{this.props.renderHeader((this.state.currentShowIndex || 0) + 1, this.props.imageUrls.length, this.props.closeFunc)}*/}
				<Animated.View style={[simpleStyle.defaultHeaderBox, {top: this.slideIn}]}>
					<Header
						style={{borderBottomColor: "transparent"}}
						title={<View style={simpleStyle.defaultHeaderContent}>
							<Text style={simpleStyle.defaultHeaderContentText}>
								{(this.state.currentShowIndex + 1) + "/" + this.props.imageUrls.length}
							</Text>
						</View>}
						backgroundColor="transparent"
						leftComponent={<TouchableOpacity
							style={simpleStyle.defaultHeaderLeft}
							onPress={this.props.closeFunc}
							activeOpacity={0.8}>
							<View style={simpleStyle.defaultHeaderLeftBox}>
								<Text style={{fontFamily: 'iconfont', color: "#fff", fontSize: 20}}>&#xe603;</Text>
								<Text style={{color: "#fff", fontSize: 14}}>返回</Text>
							</View>
						</TouchableOpacity>}
						leftClick={this.props.closeFunc}
					/>
				</Animated.View>

				{
					this.props.title && <View style={simpleStyle.defaultTitleBox}>
						<Animated.Text style={{color: "#fff", fontSize: 14, opacity: this.fadeTitle}}>{this.props.title}</Animated.Text>
					</View>
				}

				{/*{this.props.imageUrls[this.state.currentShowIndex || 0] &&*/}
				{/*this.props.imageUrls[this.state.currentShowIndex || 0]*/}
					{/*.originSizeKb &&*/}
				{/*this.props.imageUrls[this.state.currentShowIndex || 0]*/}
					{/*.originUrl && (<View style={this.styles.watchOrigin}>*/}
					{/*<TouchableOpacity style={this.styles.watchOriginTouchable}>*/}
						{/*<Text style={this.styles.watchOriginText}>查看原图(2M)</Text>*/}
					{/*</TouchableOpacity>*/}
				{/*</View>)}*/}
				<Animated.View style={[
					{left: 0, bottom: this.slideFooter, position: "absolute", zIndex: 9999},
					this.props.footerContainerStyle
				]}>
					{this.props.renderFooter(this.state.currentShowIndex)}
				</Animated.View>
			</Animated.View>
		</Animated.View>);
	}

	getMenu() {
		if (!this.state.isShowMenu) {
			return null;
		}
		return (<View style={this.styles.menuContainer}>
			<View style={this.styles.menuShadow}/>
			<View style={this.styles.menuContent}>
				<TouchableHighlight underlayColor="#F2F2F2" onPress={this.saveToLocal} style={this.styles.operateContainer}>
					<Text style={this.styles.operateText}>
						{this.props.menuContext.saveToLocal}
					</Text>
				</TouchableHighlight>
				<TouchableHighlight underlayColor="#F2F2F2" onPress={this.handleLeaveMenu} style={this.styles.operateContainer}>
					<Text style={this.styles.operateText}>
						{this.props.menuContext.cancel}
					</Text>
				</TouchableHighlight>
			</View>
		</View>);
	}

	render() {
		let childs = null;
		childs = (<View>
			{this.getContent()}
			{this.getMenu()}
		</View>);
		return (<View onLayout={this.handleLayout} style={Object.assign({flex: 1, overflow: "hidden"}, this.props.style)}>
			{childs}
		</View>);
	}
}
ImageViewer.defaultProps = new Props();
