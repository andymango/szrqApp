import React, {Component} from 'react';
import {Say, Loading, Confirm} from '@/libs/btOverlay';
import {
	Platform,
	TouchableHighlight,
	Text,
	Button,
	View
} from 'react-native';

export default class Mine extends Component {
	constructor(props) {
		super(props);
	}

	logout(){
		new Confirm({
			title: '确定退出登录？',
			onOk: () => {
				new Say('退出成功')
			}
		})
	}

	render() {
		return <View>
			<Text>我的</Text>
			<Button
				title='注销'
				onPress={this.logout.bind(this)}
			></Button>
		</View>;
	}
}
