import React, {Component} from 'react';
import userService from '@/services/user';
import {Say, Loading, Confirm} from '@/libs/btOverlay';
import LinearGradient from 'react-native-linear-gradient';
import BaseStyle from '@/style/baseStyle';
// import BtButton from '@/components/common/BtButton';

import {
	Platform,
	TouchableHighlight,
	BVLinearGraient,
	Text,
	TextInput,
	Button,
	View
} from 'react-native';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			canSubmit: false,
			userName: '',
			password: ''
		};
	}

	//提交
	submit(){
		Loading.show();
		userService.login(this.state).then(
			(data) => {
				new Say('登录成功');
				this.props.navigation.navigate('main');
			}, (errMst) => {
				new Say('登录失败')
			}
		).finally(() => {
			Loading.hide();
		})
	}
	render() {
		return <LinearGradient colors={['#f2a19e', '#ED514B']} style={{flex: 1}}>
			<TextInput placeholder="请输入密码"></TextInput>
			<TextInput placeholder="请输入手机号"></TextInput>
			<Button
				style={[BaseStyle.commonBtn, {}]}
                onPress={this.submit.bind(this)}
				title='登录'
				disabled={!this.state.userName || !this.state.password}
			></Button>
		</LinearGradient>;
	}
}
