import React, {Component} from 'react';
import userService from '@/services/user';
import {Say, Loading, Confirm} from '@/libs/btOverlay';
import LinearGradient from 'react-native-linear-gradient';
import BaseStyle from '@/style/baseStyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import { List, Button, InputItem, WhiteSpace, WingBlank } from 'antd-mobile-rn';

import {
	Image,
	View,
	Text
} from 'react-native';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			canSubmit: false,
			account: '',
			password: ''
		};
	}

	//提交
	submit(){
		Loading.show('提交中');
		userService.login(this.state).then(
			(data) => {
				if(data.code === 1){
					new Say({
						title: '登录成功',
						type: 'success'
					});
					this.props.navigation.navigate('main');
				} else{
					new Say({
						title: '登录失败',
						type: 'error'
					})
				}
			}
		).finally(() => {
			Loading.hide();
		})
	}
	render() {
		return <LinearGradient colors={['#f2a19e', '#ED514B']} style={styles.wrapper}>
			<View style={styles.logoBox}>
				<Image source={require("@/imgs/logo.png")} />
			</View>
			<WingBlank>
				<InputItem
					style={styles.input}
					clear
					// type="phone"
					value={this.state.account}
					onChange={(value) => {
					this.setState({
						account: value,
					});
					}}
					placeholder="请输入手机号"
				>
					用户名
				</InputItem>
				<WhiteSpace />
				<InputItem
					style={styles.input}
					clear
					type="password"
					value={this.state.password}
					onChange={(value) => {
					this.setState({
						password: value,
					});
					}}
					placeholder="请输入您的密码"
				>
					密码
				</InputItem>
				<WhiteSpace />
				<WhiteSpace />
				<WhiteSpace />
				<WhiteSpace />
				<Button
					// style={[BaseStyle.commonBtn, styles.btn]}
					onClick={this.submit.bind(this)}
					title='登录'
					 type="warning"
					// activeStyle={styles.btnActive}
					disabled={!this.state.account || !this.state.password}
				>
					登录
				</Button>
			</WingBlank>
		</LinearGradient>;
	}
}

const styles = EStyleSheet.create({
	wrapper: {
		flex: 1,
		paddingTop: '$statusBarHeight',
		// paddingLeft: 15,
		// paddingRight: 15,
		// justifyContent:'center',
		// alignItems:'center',

	},
	logoBox: {
		alignItems:'center',
		marginTop: 100,
		marginBottom: 30
	},
	input: {
		marginLeft: 0
		// color: '$c33',
		// backgroundColor: 'transparent',
		// borderRadius: 5,
		// borderColor: 'blue',
	},
	btn: {
		// marginTop: 30
	}
});