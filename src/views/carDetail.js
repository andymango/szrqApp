import React, {Component} from 'react';

import {deviceW, deviceH} from 'framework/utils.js';

const styles = EStyleSheet.create({
	container: {
		backgroundColor: '#f3f3f3',

	},
	pbody: {
		position: 'relative'

	},
	car_information_title: {
		backgroundColor: '#fff'
	},
	car_info: {
		paddingHorizontal: 11,
		paddingVertical: 15,
		color: '#333',
		lineHeight: 25,
		fontSize: 17,

	},
	labels: {

		position: 'relative',
		display: 'flex',
		marginHorizontal: 15,
	},
	// 标签
	label_style: {
		position: 'relative',
		height: 12,
		width: 60,
		// 半边框
		borderStyle: 'solid',
		borderColor: '#c8e5ce',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	child_one: {
		fontSize: 9,
		paddingVertical: 2,
		paddingHorizontal: 2,
		color: '#56ba5a',
		lineHeight: 12


	},

	car: {
		backgroundColor: '#f9f9f9',
		marginHorizontal: 15,
		borderRadius: 5,
	},
	car_gear: {
		position: 'relative',
		display: 'flex',
		height: 68,
		flexDirection: 'row',
		paddingHorizontal: 15,
	},
	// 档位信息文字
	gear_text: {
		color: '#666',
		// fontSize: 12,
		// lineHeight:1,
		// whiteSpace:'nowrap',
	},
	gear_content: {
		flex: 1,
		marginTop: 15
	},
	// 批发价佣金信息
	item_trade: {
		flexDirection: 'row',
		height: 30,
		marginLeft: 15,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	name: {
		color: '#999',
		fontSize: 12,
	},
	name_later: {
		color: '#999',
		fontSize: 12,
		marginLeft: 5,
	},
	name_later_retail: {
		color: '#999',
		fontSize: 12,
		marginLeft: 5,
		textDecorationLine: 'line-through',
	},
	price: {
		color: '#e83c36',
		fontSize: 17,
	},
	tips: {
		position: 'relative',
		marginHorizontal: 15,
		marginBottom: 15,
		paddingHorizontal: 15,
		paddingVertical: 10,
		// display:'block',
		width: 'auto',
		backgroundColor: '#feefe5',
		borderRadius: 5
	},
	business_man_out: {
		position: 'relative',
		paddingHorizontal: 15,
		paddingBottom: 20,
		paddingTop:5,
		flexDirection: 'row',

		justifyContent: 'center',
		height: 60,
	},
	picture_business_man: {
		width: 50,
		height: 50
	},
	business_man_info: {
		// float:'left',
	},
	business_name: {
		position: 'relative',
		flexDirection: 'row',
		// float:left,
		color: '#612a61',
		fontSize: 15
	},
	member: {
		backgroundColor: '#eec283',
		borderRadius: 2,
		marginLeft: 5,
		color: 'black',
		fontSize: 4,
		padding: 1,
		marginTop: 7,
		marginBottom: 7,
		marginLeft: 3,
	},
	member_another: {
		color: '#939393',
		fontSize: 12,
		lineHeight: 18,
		marginBottom: 10,
		marginLeft: 8
	},
	name_info_out: {
		flexDirection: 'row',
		marginLeft: 8
	},

	// 右关注
	pay_attention: {
		position: 'relative',
		top: 7,
		borderStyle: 'solid',
		borderColor: 'red',
		borderWidth: 1,
		borderRadius: 3,
		// float:'right',
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginRight: 15,
		height: 20,
		justifyContent: 'center'

	},
	pay_attention_text: {
		color: 'red',
		fontSize: 10,
	},
	// 亮点配置
	module_item: {
		marginTop: 10,
		backgroundColor: '#fff',
	},
	title: {
		flexDirection: 'row',
		padding: 15,
	},
	shinning_setting_text: {
		fontSize: 15,
		lineHeight: 15,
		color: '#000',
		marginLeft: 5,

	},
	line: {
		width: 2,
		height: 14,
		position: 'relative',
		backgroundColor: '#eb3b43',
	},
	scroll_content: {
		marginLeft: 15
	},
	scroll_picture: {
		width: 50,
		height: 50,
		backgroundColor: '#808A87',
	},
	scroll_text: {
		paddingTop: 10,
		marginBottom: 5,
		lineHeight: 16,
		color: '#000',
		fontSize: 12,
		height: 32,
		textAlign: 'center',

	}
});

import {
	View,
	Text,
	Image,
	Alert,
	ScrollView,
	Dimensions
} from 'react-native';
import {getCarDetail} from "services/homeService";
import EStyleSheet from 'react-native-extended-stylesheet';

export default class carDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			message:'',
			fullName:''
		}
	}

	async fetchData() {
		let data = await getCarDetail({});
		console.log(data);
		this.data = data;
		console.log(data);
		// alert(JSON.stringify(data));
		alert(JSON.stringify(data.object.fullName));

	}

	componentDidMount() {
		this.fetchData();
		getCarDetail({}).then((data) =>{
			this.setState({
				message:data.message,
				fullName:JSON.stringify(data.object.fullName),
				data:data.object
		});
		});
	}


	render() {
		const carDefault = require('img/common/car-default.png');
		let carDetail =this.state.data;
		return (
			<View style={styles.container}>
				<ScrollView>
					{/*header*/}
					{/*<BtImage*/}
					{/*style={{width: deviceW, height: 250}}*/}
					{/*size="300"*/}
					{/*source={require('img/test/car_bg.png')}*/}
					{/*defaultSource={carDefault}*/}
					{/*/>*/}
					<Image source={require('img/test/car_bg.png')} style={{width: deviceW, height: 250}}></Image>

					{/*pbody*/}
					<View style={styles.pbody}>
						{/*车辆信息*/}
						<View>
							<View style={styles.car_information_title}>
								<Text style={styles.car_info}>
									{/*{this.state.message}*/}
									{/*揽胜运动版 2016款 3.0 V6 SC HESE*/}
									{/*{this.state.fullName}*/}
									{carDetail.fullName}
								</Text>
								<Text onPress={() => this.fetchData()}>我们都是好孩子</Text>
								<View style={styles.labels}>
									<View style={styles.label_style}>
										<Text
											style={styles.child_one}>可担保交易</Text>
									</View>
								</View>
							</View>
							{/*title底下body信息*/}
							<View style={{position: "relative", backgroundColor: '#fff', paddingVertical: 15}}>
								{/*车辆档位信息*/}
								<View style={styles.car}>
									<View style={styles.car_gear}>
										<View style={styles.gear_content}>
											<Text style={styles.gear_text}>2018年02月</Text>
											<Text style={styles.gear_text}>自动/2.0T</Text>
										</View>
										<View style={styles.gear_content}>
											<Text style={styles.gear_text}>6.00万公里</Text>
											<Text style={styles.gear_text}>0次过户</Text>

										</View>
										<View style={styles.gear_content}>
											<Text style={styles.gear_text}>浙江-杭州</Text>
											<Text style={styles.gear_text}>国IV</Text>
										</View>
									</View>
								</View>
								{/*批发价 佣金*/}
								<View style={{marginTop: 15, backgroundColor: '#fff'}}>

									<View style={styles.item_trade}>
										<Text style={styles.name}>批发价</Text>
										<Text style={styles.price}>30万</Text>
										<Text style={styles.name_later_retail}>零售价35万</Text>

									</View>
									<View style={styles.item_trade}>
										<Text style={styles.name}>佣 金</Text>
										<Text style={styles.price}>30万</Text>
										<Text style={styles.name_later}>保底价34万</Text>
									</View>
								</View>
							</View>
							{/*footer关注信息*/}
							<View style={{position: 'relative', backgroundColor: '#fff'}}>
								<View style={styles.tips}>
									<Text style={{color: '#f37f4d', fontSize: 12}}>看不到价格？关注后可查看价格</Text>
								</View>
								<View style={styles.business_man_out}>
									{/*左头像*/}
									<View style={{flexDirection: 'row', flex: 1}}>
										<Text style={{width: 40, height: 40, backgroundColor: '#eee'}}></Text>
										{/*<Image source={require('img/common/logo.png')} style={{width:50,height:50}}></Image>*/}

										{/*中信息*/}
										<View style={styles.business_man_info}>
											<View style={styles.name_info_out}>
												<Text style={styles.business_name}>弯弯</Text>
												<Text style={styles.member}>黑金会员</Text>
											</View>
											<View>
												<Text style={styles.member_another}>浙江爱车巴巴网络科技有限公司</Text>
											</View>
										</View>
									</View>
									{/*右关注*/}
									<View style={styles.pay_attention}>
										<Text style={styles.pay_attention_text}>+ 关注</Text>
									</View>
								</View>
							</View>
						</View>
						{/*亮点配置*/}
						<View style={styles.module_item}>
							<View style={styles.title}>
								<View style={styles.line}></View>
								<Text style={styles.shinning_setting_text}>亮点配置</Text>
							</View>
							<ScrollView horizontal={true}
								// 滚动条隐藏
													showsHorizontalScrollIndicator={false}>
								<View style={styles.scroll_content}>
									<Text style={styles.scroll_picture}></Text>
									<Text style={styles.scroll_text}>自动大灯</Text>
								</View>
								<View style={styles.scroll_content}>
									<Text style={styles.scroll_picture}></Text>
									<Text style={styles.scroll_text}>自动大灯</Text>
								</View>
								<View style={styles.scroll_content}>
									<Text style={styles.scroll_picture}></Text>
									<Text style={styles.scroll_text}>自动大灯</Text>
								</View>
								<View style={styles.scroll_content}>
									<Text style={styles.scroll_picture}></Text>
									<Text style={styles.scroll_text}>自动大灯</Text>
								</View>
								<View style={styles.scroll_content}>
									<Text style={styles.scroll_picture}></Text>
									<Text style={styles.scroll_text}>自动大灯</Text>
								</View>
								<View style={styles.scroll_content}>
									<Text style={styles.scroll_picture}></Text>
									<Text style={styles.scroll_text}>自动大灯</Text>
								</View>
								<View style={styles.scroll_content}>
									<Text style={styles.scroll_picture}></Text>
									<Text style={styles.scroll_text}>自动大灯</Text>
								</View>
								<View style={styles.scroll_content}>
									<Text style={styles.scroll_picture}></Text>
									<Text style={styles.scroll_text}>自动大灯</Text>
								</View>
							</ScrollView>
							{/*<ScrollView horizontal={true}*/}
							{/*showsHorizontalScrollIndicator={false}>*/}
							{/*{this.renderChildView()}*/}
							{/*</ScrollView>*/}
						</View>
					</View>
				</ScrollView>
			</View>
		)
	}

	// renderChildView() {
	// 	var allChild = [];
	// 	var colors = ['red', 'green', 'blue', 'yellow', 'purple'];
	// 	// 遍历
	// 	for (var i = 0; i < 5; i++) {
	// 		allChild.push(
	// 			//  循环排列的view中必须有唯一表示
	// 			<View key={i} style={{backgroundColor: colors[i], width: 150, height: 120}}>
	// 				<Text style={{flex: 1, fontSize: 20, marginTop: 50, marginLeft: 100}}>{colors[i]}</Text>
	// 			</View>
	// 		);
	// 	}
	// 	// 返回数组
	// 	return allChild;
	// }
}
