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

	render() {
		return Platform.OS === 'ios' ? (
			<TouchableHighlight {...this.props}
													activeOpacity={0.7}>
				{this.props.children}
				</TouchableHighlight>
		) : (
				<TouchableNativeFeedback
					onPress={this.props.onPress}
				>
					<View {...this.props}>
						{this.props.children}
					</View>
				</TouchableNativeFeedback>
		)
	}
}

BtButton.propType = {
	children: PropTypes.any.isRequired
};