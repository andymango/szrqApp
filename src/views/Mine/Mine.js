import React, {Component} from 'react';
import {Say, Loading, Confirm} from '@/libs/btOverlay';
import EStyleSheet from 'react-native-extended-stylesheet';
import userService from '@/services/user';
import { List, WhiteSpace, Button, WingBlank, NoticeBar} from 'antd-mobile-rn';
import {
	Platform,
	TouchableHighlight,
	Image,
	Text,
	View
} from 'react-native';
import GConfig from '@/config'

const Item = List.Item;
const Brief = Item.Brief;

export default class Mine extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		version: GConfig.appVersion
	};

	goToModifyPwd(){
		new Say('fdsafds')
		this.props.navigation.push('modifyPwd')
	}

	logout(){
		let _this = this;
		new Confirm({
			title: '确定退出登录？',
			onOk: () => {
				userService.logout().then(() => {
					_this.props.navigation.navigate('login');
				})
			}
		})
	}

	render() {
		return <View>
			<NoticeBar
				onClick={() => alert('click')}
				marqueeProps={{ loop: true, style: { fontSize: 12, color: 'red' } }}
				>
				Notice: The arrival time of incomes and transfers of Yu 'E Bao will be
				delayed during National Day.
        	</NoticeBar>
			<WhiteSpace/>
        	<List>
				<Item extra="" arrow="horizontal" onClick={this.goToModifyPwd.bind(this)}>
				修改密码
				</Item>
				<Item extra={this.state.version} arrow="empty">
				当前版本
				</Item>
		  	</List>
			<WhiteSpace/>
			<WhiteSpace/>
			<WhiteSpace/>
			<WhiteSpace/>
			<WingBlank>
				<Button
					type="warning"
					onClick={this.logout.bind(this)}
				>注销</Button>
			</WingBlank>
		</View>;
	}
}
