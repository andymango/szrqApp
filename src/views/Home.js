import React, {Component} from 'react';
import {
	Text,
	View
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {Say, Loading, Confirm} from '@/libs/btOverlay';
export default class ViewComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <View style={styles.wrapper}>
			<Text>Home11</Text>
		</View>;
	}
}

const styles = EStyleSheet.create({
	wrapper: {
		backgroundColor: 'red',
		marginTop: '$statusBarHeight',
	},
});