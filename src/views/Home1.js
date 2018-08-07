import React, {Component} from 'react';
import {
	Text,
	TouchableHighlight,
	View,
	Button,
	AppState,//app状态
	Image,
	ScrollView,
	Modal,
	CameraRoll
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet'
import Header from 'components/common/Header'
import {getHomeConfig} from "services/homeService"
import Banner from 'components/common/Banner/index'
import BtImage from 'components/common/BtImage'

import uiModule from 'framework/nativeBridge/uiModule'
import userInfoModule from 'framework/nativeBridge/userInfoModule'
import cacheModule from 'framework/nativeBridge/cacheModule'
import shareModule from 'framework/nativeBridge/shareModule'
import systemModule from 'framework/nativeBridge/systemModule'
import locationModule from 'framework/nativeBridge/locationModule'
import btBury from 'framework/btBury'
import Confirm from "framework/btOverlay/confrim";
import Say from "framework/btOverlay/say";
import Loading from "framework/btOverlay/loading";

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

import BtButton from 'components/common/BtButton'
import ImageViewer from 'components/common/react-native-image-viewer/index'
import {
	LazyloadScrollView,
	LazyloadView,
	LazyloadImage
} from 'components/common/react-native-lazyload';
import {deviceW, deviceH} from "framework/utils";

import BtWebModal from 'components/common/BtWebModal'

const PAGE_WIDTH = deviceW;
const PAGE_HEIGHT = deviceH;

const images = [{
	url: "http://192.168.100.142/PUBLIC/CAR_IMAGE/2018-03-19/c9c5e2f9-3db3-4eae-bad6-f9f1b6faf88c.jpg",
},{
	url: "http://192.168.100.142/PUBLIC/CAR_IMAGE/2018-03-19/27304ae1-e5a7-4ff8-bfe2-6ef07a6ea208.jpg",
},{
	url: "http://192.168.100.142/PUBLIC/CAR_IMAGE/2018-03-19/b62a32c0-316c-4c61-8b7e-0bf1689de2ce.jpg",
},{
	url: "http://192.168.100.142/PUBLIC/CAR_IMAGE/2018-03-19/44eefe47-5963-4e1d-9a20-2574b85f3fdc.jpg",
},{
	url: "http://192.168.100.142/PUBLIC/CAR_IMAGE/2018-03-19/804b2ff9-7832-4718-acc6-a5cf70f429d6.jpg",
},{
	url: "http://192.168.100.142/PUBLIC/CAR_IMAGE/2018-03-19/c0b819f4-3804-4232-b31d-e7727e7224aa.jpg"
}];
// type Props = {}; 这种是tpyeScript的写法
export default class Home extends Component {

	static defaultProps = {
		isShowWebModal: false
	}

	constructor(props) {
		super(props);
		this.state = {
			message: '',
			data: {},
			isShowBanner: true,
			modalVisible: true,
			isShowWebModal: this.props.isShowWebModal
		};
		this.currBannerIndex = 0;
	}

	open() {
		// 路由跳转，请模仿这里
		// btPage.open({
		// 	url: 'http://www.baidu.com',
		// 	jsOnResume: () => {
		// 		alert('回调');
		// 		console.log('回调！！');
		// 	}
		// })
	}

	toDemoList() {
		// btPage.open({
		// 	url: '/common/demoList?id=1',
		// 	jsOnResume: (data) => {
		// 		alert('回调 ' + data);
		// 		console.log('回调！！');
		// 	}
		// })
	}

	toApp() {
		// btPage.open({
		// 	url: '/common/app',
		// 	jsOnResume: () => {
		// 		alert('回调');
		// 		console.log('回调！！');
		// 	}
		// })
	}

	goBack() {
		// btPage.open({
		// 	url: '/common/app',
		// 	jsOnResume: () => {
		// 		alert('回调');
		// 		console.log('回调！！');
		// 	}
		// })
	}

	async fetchData() {

		let data = await getHomeConfig({
			enterValues: 1
		});
		alert(JSON.stringify(data));
	}

	bury() {
		btBury.pushPV({
			actionId: 'code1',
			extras: {
				id: 2
			}
		})
		btBury.pushEvent({
			actionId: 'code3',
			extras: {
				id: 3
			}
		})
	}

	telCall() {
		systemModule.callUp({
			extCode: '400',
			virtualNumber: '123456'
		});
	}

	jumpToCarDetail(){
		// btPage.open({
		// 	url:'/common/carDetail',
		// 	jsOnResume:(data) =>{
		// 	}
		// })
	}

	pickPhoto() {
		let json = {
			"maxCount": 1,
			"title": "请上传清晰行驶证/铭牌照片1",
			"firstSubtitle": "请将行驶证/铭牌照片置于此区域1",
			"secondSubtitle": "保证品牌车型、车辆识别码、发动机号清晰可见1",
			"type": 2,
			"openType": 0
		};
		systemModule.showImagePickDialog(json, (result) => {
			console.log(result);
			alert(result);
		});
	}

	appVersion() {
		systemModule.getAppVersion((result) => {
			alert(result);
		});
	}

	enableSlideBack() {
		// systemModule.slideBack(2);
	}


	showDialog() {

		// 两个按钮
		new Confirm({
			title: "标题",
			desc: "是否提交?",
			cancelText: "取消1",
			confirmText: "确认",
			oncancel: () => {
				alert('取消')
			},
			onok: () => {
				alert('确定')
			}
		});

		// 一个按钮
		new Confirm({
			// title: "标题",
			desc: "是否提交?",
			cancelText: "",
			confirmText: "确认",
			onok: () => {
				alert('确定')
			}
		});

		new Confirm('我就是一个弹窗')
	}

	showLoading() {
		Loading.show('哈哈哈');

		var _this = this;
		setTimeout(function () {
			_this.dismissLoading();
		}, 500)
	}

	dismissLoading() {
		Loading.hide();
	}

	showSuccessToast() {
		new Say({
			type: 'success',
			title: '提交成功'
		});
	}

	showFailedToast() {
		new Say({
			type: 'error',
			title: '提交失败'
		});

	}

	showToast() {
		new Say('toast');
	}

	shareInfo() {
		let json = {
			"sharePhotos": "http://192.168.100.142/PUBLIC/CAR_IMAGE/2018-05-16/756b30c8-127e-4d50-b10b-16374307fbf1-100.jpg",
			"shareTitle": "3系GT 2017款 320i 豪华设计套装只要20.0万元,手慢无哦~",
			"shareDesc": "我在备胎好车发现一辆宝马，行驶5万公里，2017-05-01上牌， 良心保证绝对棒，大家该出手时就出手啊！",
			"shareUrl": "http://192.168.100.142:8012/trade/car_detail?id=299108&shareCode=eyJjdXN0SWQiOjI5NzI0LCJkZXZpY2VDb2RlIjoiNDVBRDcyRjgtNkFBNC00OEQ4LUFDODYtNzIyOUQ2NEM0NDcyIiwic291cmNlIjoiY2FyRGV0YWlsIn0=",
			"command": "复制整段信息，打开👉备胎好车商家版👈App，即可快捷联系卖家【方群立,大豪车交易中心】 http://www.acar168.cn:5511/s/8S2O5 ",
			"menuTitle": "神车分享哦",
			"menuType": 3,
			"anchorY": 500,
			"anchorViewHeight": 200
		}
		shareModule.shareInfo(json, function (data) {
			console.log(data);
		});
	}

	setRuntimeValue() {
		cacheModule.setRuntimeValue('key', '123');
	}

	getRuntimeValue() {
		cacheModule.getRuntimeValue('key', (result) => {
			alert(result);
		});
	}

	setDiskValue() {
		cacheModule.setDiskValue('key', {id: 1, name: 1});
	}

	getDiskValue() {
		cacheModule.getDiskValue('key', (result) => {
			alert(JSON.stringify(result));
		});
	}

	getUserInfo() {
		userInfoModule.getUserInfo((result) => {
			console.log(result);
		});
	}

	setUserInfo() {
		let userInfo = {
			id: 1,
			name: '扑通',
			mobile: '15678909',
			accessToken: 'xxxxxx'
		}
		userInfoModule.setUserInfo(userInfo);
	}

	getUserLocation() {
		userInfoModule.getUserLocation((result) => {
			alert(JSON.stringify(result));
		});
	}

	requestLocation() {
		locationModule.requestLocation().then(result => {
			alert(result);
		});
	}

	showActionSheet() {

		let json = [
			{
				id: 1,
				name: "test"
			},
			{
				id: 2,
				name: 'test1'
			}
		];
		uiModule.showActionSheet(json, (index) => {
			alert(index);
		}, () => {
			alert('选择取消');
		})
	}

	onPressLearnMore() {
		// btPage.goBack()
		//alert('我就是摁摁');
	}

	componentDidMount() {
		getHomeConfig({
			enterValues: 1
		}).then((data) => {
			this.setState({
				message: data.message
			});

		});

		this.listener = RCTDeviceEventEmitter.addListener("home_refreshkey", (body) => {
			this.setState({
				message: '监听成功了'
			});
			console.log(body);
			alert(JSON.stringify(body));
		});

	}
	setCurrBannerIndex(index){
		this.currBannerIndex = index;
	}
	fnOnAnimateNextPage(pageIndex){
		// alert(pageIndex);
		this.setCurrBannerIndex(pageIndex);
	}
	fnOnBannerPress(){
		this.setState({
			isShowBanner: false
		})
	}
	hideWholeBanner(){
		this.setState({
			isShowBanner: true,
			modalVisible: true
		});
	}

	componentWillUnmount() {
		// 页面关闭的时候会触发
		console.log('我卸载了');
		alert('我卸载了');
		this.listener && this.listener.remove();
		this.listener = null;
	}
	saveImg(){
		const url = 'http://192.168.100.142/PUBLIC/CAR_IMAGE/2018-03-19/804b2ff9-7832-4718-acc6-a5cf70f429d6.jpg';
		systemModule.saveImg(url, data => {
			alert(data);
		});
	}

	showWebModal(visible) {
		console.log('xianshi1');
		this.setState({
			isShowWebModal: visible
		});
	}

	render() {
		let imgDemo = 'http://192.168.100.142/PUBLIC/CAR_IMAGE/2018-03-19/804b2ff9-7832-4718-acc6-a5cf70f429d6.jpg';
		let imgDemoLocal = require('img/common/loading.png');

		return (
			<View>
				<Header
					title="首页header"
					backgroundColor="#fff"
					leftClick={() => /*btPage.goBack()*/""}
				/>
				<BtWebModal
					isShow={this.state.isShowWebModal}
					changeShow={this.showWebModal.bind(this)}
				>
					<Text>1212</Text>
				</BtWebModal>

				<LazyloadScrollView style={{marginBottom: 64}} name="lazyload-list">
					<BtButton
						onPress={this.onPressLearnMore}
						title="我是个button"
						color="red"
						children={<Text style={{fontFamily:'iconfont'}}>&#xe603;</Text>}
					/>
					<BtImage
						style={styles.image}
						size="300"
						source={imgDemo}
						defaultSource={imgDemoLocal}
					/>
					<Text style={styles.welcome}>
						欢迎，这是首页12，这是我mock到的数据: {this.state.message}
					</Text>
					<Text style={{fontFamily: 'iconfont'}}>&#xe64c;</Text>
					<Text style={{fontFamily: 'iconfont'}}>&#xe608;</Text>
					<Text style={{fontFamily: 'iconfont'}}>&#xe61d;</Text>

					{
						this.state.isShowBanner && <Banner
							imgList={images}
							imgStyle={styles.img}
							fnOnPress={this.fnOnBannerPress.bind(this)}
							config={{
								autoplay: true,
								delay: 2000,
								pageInfo: true,
								currentPage: this.currBannerIndex,
								pageStyle: {
									width: PAGE_WIDTH,
									height: 200,
								},
								pageInfoBottomContainerStyle: styles.bannerPageInfoBottomContainerStyle,
								pageInfoTextStyle: styles.bannerPageInfoTextStyle,
								onAnimateNextPage: this.fnOnAnimateNextPage.bind(this),
							}}
						/>
					}

					<BtButton
						style={styles.button}
						underlayColor='#ff6600'
						onPress={() => this.showWebModal(true)}
						children={<Text> 展示模态窗1 </Text>}
					>

					</BtButton>

					<BtButton
						style={styles.button}
						underlayColor='#ff6600'
						onPress={this.open.bind(this)}
						children={<Text style={styles.text}>open 百度 webView</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.toDemoList.bind(this)} children={<Text style={styles.text}>to demoList rnView 有setResult</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.toApp.bind(this)} children={<Text style={styles.text}>to app rnView 没有setResult</Text>}>

					</BtButton>

					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.goBack.bind(this)} children={<Text style={styles.text}>先打开APP页面再点击goBack按钮</Text>}>

					</BtButton>

					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.fetchData.bind(this)} children={<Text style={styles.text}>fetchData</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.bury.bind(this)} children={<Text style={styles.text}>bury</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.telCall.bind(this)} children={<Text style={styles.text}>telCall</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.pickPhoto.bind(this)} children={<Text style={styles.text}>pickPhoto</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.appVersion.bind(this)} children={<Text style={styles.text}>appVersion</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.enableSlideBack.bind(this)} children={<Text style={styles.text}>enableSlideBack</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.showDialog.bind(this)} children={<Text style={styles.text}>showDialog</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.showLoading.bind(this)} children={<Text style={styles.text}>showLoading</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.dismissLoading.bind(this)} children={<Text style={styles.text}>dismissLoading</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.showSuccessToast.bind(this)} children={<Text style={styles.text}>showSuccessToast</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.showFailedToast.bind(this)} children={<Text style={styles.text}>showFailedToast</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.showToast.bind(this)} children={<Text style={styles.text}>showToast</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.shareInfo.bind(this)} children={<Text style={styles.text}>shareInfo</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.setRuntimeValue.bind(this)} children={<Text style={styles.text}>setRuntimeValue</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.getRuntimeValue.bind(this)} children={<Text style={styles.text}>getRuntimeValue</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.setDiskValue.bind(this)} children={<Text style={styles.text}>setDiskValue</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.getDiskValue.bind(this)} children={<Text style={styles.text}>getDiskValue</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.getUserInfo.bind(this)} children={<Text style={styles.text}>getUserInfo</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.setUserInfo.bind(this)} children={<Text style={styles.text}>setUserInfo</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.getUserLocation.bind(this)} children={<Text style={styles.text}>getUserLocation</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.requestLocation.bind(this)} children={<Text style={styles.text}>requestLocation</Text>}>

					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.showActionSheet.bind(this)} children={<Text style={styles.text}>showActionSheet</Text>}>
					</BtButton>

					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.jumpToCarDetail.bind(this)} children={<Text style={styles.text}>车辆详情style</Text>}>
					</BtButton>
					<BtButton style={styles.button} underlayColor='#ff6600' onPress={this.saveImg.bind(this)} children={<Text style={styles.text}>保存图片到本地</Text>}>
					</BtButton>

					{
						images.map((item, index) => (
							<View key={index}>
								<LazyloadImage
									source={{uri: item.url}}
									style={styles.img}
									host="lazyload-list"
								/>
							</View>
						))
					}
				</LazyloadScrollView>

				{
					!this.state.isShowBanner && <View style={{padding: 10}}>
						<Modal
							visible={this.state.modalVisible}
							transparent={true}
							animationType={"fade"}
							onRequestClose={() => this.setState({ modalVisible: false })}
						>
							<ImageViewer
								imageUrls={images}
								unmountFunc={this.hideWholeBanner.bind(this)}
								closeFunc={this.hideWholeBanner.bind(this)}
								onChange={this.fnOnAnimateNextPage.bind(this)}
								title={"A级 2017款 改款 A 200 时尚型"}
								flipThreshold={PAGE_WIDTH*0.5}
								renderFooter={()=>(
									<View style={styles.footerBox}>
										<BtButton
											style={styles.button}
											underlayColor='#ff6600'
											onPress={()=>alert('test bottom button')}
											children={<Text style={styles.text}>test bottom button 1</Text>}>
										</BtButton>
										<BtButton
											style={styles.button}
											underlayColor='#ff6600'
											onPress={()=>alert('test bottom button')}
											children={<Text style={styles.text}>test bottom button 2</Text>}>
										</BtButton>
									</View>
								)}
								footerHeight={70}
								index={this.currBannerIndex} />
						</Modal>
					</View>
				}

			</View>

		);
	}
}

const styles = EStyleSheet.create({
	$fontColor: 'green',
	centering: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 8
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '$red',
	},
	welcome: {
		textAlign: 'center',
		marginBottom: 5,
		color: '$fontColor'
	},
	image:{
		width: 400,
		height: 400
	},
	button: {
		height: 45,
		backgroundColor: '$orange',
		borderColor: '#00FF00',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginLeft: 15,
		marginRight: 15,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text:{
		alignSelf: 'stretch',
		textAlign: 'center',
	},
	textInput: {
		borderRadius: 5,
		borderWidth: 1,
		height: 44,
		paddingHorizontal: 10,
	},
	BannerBox: {
		width: PAGE_WIDTH,
		height: 200,
		borderStyle: "solid",
		borderColor: "#fe0",
		borderWidth: 1
	},
	showBox: {
		borderStyle: "solid",
		borderColor: "#3e4",
		borderWidth: 1
	},
	bannerPageInfoBottomContainerStyle: {
		position: "absolute",
		bottom: 10,
		right: 15,
		left: "auto",
		width: 35,
		borderRadius: 5,
		overflow: "hidden"
	},
	bannerPageInfoTextStyle: {
		color: "#fff",
		fontSize: 12
	},
	img: {
		width: PAGE_WIDTH,
		height: 200
	},
	whoelBannerBox: {
		width: PAGE_WIDTH,
		height: PAGE_HEIGHT,
		position: "absolute",
		top: 0,
		left: 0,
	},
	bannerBox: {},
	footerBox: {
		backgroundColor: "#000",
		width: PAGE_WIDTH,
		height: 70,
		alignItems: 'flex-end',
		flexDirection: 'row',
	}
});
