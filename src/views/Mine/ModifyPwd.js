import React, {Component} from 'react';
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

	constructor(props) {
		super(props);
	}

	render() {
		return <Text>修改密码</Text>;
	}
}
