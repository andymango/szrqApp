import React, {Component} from 'react';
import {
	Text,
	View
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Say, Loading, Confirm} from '@/libs/btOverlay';
import DemoScreen from './Demo'

export default class ViewComponent extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount () {
	}

	render() {
		return <View style={styles.wrapper}>
			<Text>Home11</Text>
			<DemoScreen></DemoScreen>
		</View>;
	}
}

const styles = EStyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: 'red',
		marginTop: '$statusBarHeight',
	},
});