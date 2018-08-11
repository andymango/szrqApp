import React, {Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { List, Button, InputItem, WhiteSpace, WingBlank } from 'antd-mobile-rn';
import {
	Platform,
	TouchableHighlight,
	Text,
	View
} from 'react-native';

export default class ModifyPwd extends Component {
	static navigationOptions = {
	  // header: null,
	  headerTitle: '修改密码'
	}

	state = {
		oldPwd: '',
		newPwd: '',
		newPwdRepeat: ''
	};

	submit(){
		new SyntaxError('这个暂时不开发')
	}

	constructor(props) {
		super(props);
	}

	render() {
		return <View>
			<WhiteSpace />
			<List>
				<InputItem
					style={styles.input}
					clear
					type="password"
					value={this.state.oldPwd}
					onChange={(value) => {
					this.setState({
						oldPwd: value,
					});
					}}
					placeholder="请输入您的旧密码"
				>
					旧密码
				</InputItem>
				<WhiteSpace />
				<InputItem
					style={styles.input}
					clear
					type="password"
					value={this.state.newPwd}
					onChange={(value) => {
					this.setState({
						newPwd: value,
					});
					}}
					placeholder="请输入您的新密码"
				>
					新密码
				</InputItem>
				{/* <WhiteSpace />
				<InputItem
					style={styles.input}
					clear
					type="password"
					value={this.state.newPwdRepeat}
					onChange={(value) => {
					this.setState({
						newPwdRepeat: value,
					});
					}}
					placeholder="请再输入一遍您的新密码"
				>
					重复新密码
				</InputItem> */}
				<WhiteSpace />
			</List>
			<WhiteSpace />
			<WhiteSpace />
			<WhiteSpace />
			<WhiteSpace />
			<WingBlank>
				<Button
					// style={[BaseStyle.commonBtn, styles.btn]}
					onClick={this.submit.bind(this)}
					 type="warning"
					// activeStyle={styles.btnActive}
					disabled={!this.state.oldPwd || !this.state.newPwd/* || !this.state.newPwdRepeat*/}
				>
					登录
				</Button>
			</WingBlank>
		</View>;
	}
}

const styles = EStyleSheet.create({
});