import React, {Component} from 'react';
import {
	ScrollView,
	Text,
	Image,
	View
} from 'react-native';
import { List, WhiteSpace, Button, WingBlank, NoticeBar} from 'antd-mobile-rn';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Say, Loading, Confirm} from '@/libs/btOverlay';
import {updateApp, callUp, sendSms, sendEmail} from '@/libs/linking'

const Item = List.Item;
const Brief = Item.Brief;

export default class ViewComponent extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount () {
		// callUp('15068881707')
		// updateApp();
		// Linking.getInitialURL().then((url) => {
		//   if (url) {
		// 	console.log('Initial url is: ' + url);
		//   }
		// }).catch(err => console.error('An error occurred', err));
	}

	render() {
		return <ScrollView
				style={{ flex: 1, backgroundColor: '#f5f5f9' }}
				automaticallyAdjustContentInsets={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				<List renderHeader={() => 'basic'}>
					<Item extra="" arrow="horizontal" onClick={updateApp}>
						更新app
					</Item>
					<Item extra="" arrow="horizontal" onClick={() => {
						callUp('15068881707')
					}}>
						打电话
					</Item>
					<Item extra="" arrow="horizontal" onClick={() => {
						sendSms('豆豆，收到妈妈短信了吗')
					}}>
						发短信
					</Item>
					<Item extra="" arrow="horizontal" onClick={() => {
						sendEmail('dongxiaochai@163.com')
					}}>
						发邮件
					</Item>
				</List>
			</ScrollView>;
	}
}

const styles = EStyleSheet.create({
	wrapper: {
		backgroundColor: 'red',
		flex: 1
		// marginTop: '$statusBarHeight',
	},
});