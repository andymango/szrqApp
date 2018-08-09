/**
 * 按钮组件
 * props.children来装在子模块
 * @author AshaLiu
 */
'use strict';

import React, {Component} from 'react'
import {
	View,
	Platform,
	TouchableHighlight,
	TouchableNativeFeedback
} from 'react-native'

import PropTypes from 'prop-types';

export default class BtButton extends Component {
	constructor(props) {
		super(props)
	}

	static propType = {
		children: PropTypes.any.isRequired
	};

	render() {
		return
			<View>
				{this.props.children}
			</View>

	}
}