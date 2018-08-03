import React, {Component} from 'react';
import {
	Platform,
	TouchableHighlight,
	Text,
	View
} from 'react-native';

import btPage from "../libs/btPage";
import Header from '../components/common/Header'
import EStyleSheet from "react-native-extended-stylesheet";

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
// import routerModule from 'framework/nativeBridge/routerModule'

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' +
	'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' +
	'Shake or press menu button for dev menu',
});

export default class App extends Component {

	constructor(props) {
		super(props);
	}

	onPressButton() {
	}

	goBack() {
		// routerModule.sendEvent('home_refreshkey', 12)
		btPage.goBack({
      step: 2,
			eventKey: 'home_refreshkey',
			args: {
      	key: 222
			}
    })
	}

	openHome(){
		btPage.open({
			url: '/common/demo'
		});
	}

	eventEmitter(){
		RCTDeviceEventEmitter.emit('home_refreshkey', {
			key: 111
		});
	}



	render() {
		return (
			<View>
				<Header
					title="App header"
					backgroundColor="#fff"
					leftClick={() => btPage.goBack()}
				/>
				<TouchableHighlight style={styles.button} underlayColor='#ff6600' onPress={this.goBack.bind(this)}>
					<Text style={styles.text}>goBack 2步1212</Text>
				</TouchableHighlight>

				<TouchableHighlight style={styles.button} underlayColor='#ff6600' onPress={this.eventEmitter.bind(this)}>
					<Text style={styles.text}>eventEmitter</Text>
				</TouchableHighlight>

				<TouchableHighlight style={styles.button} underlayColor='#ff6600' onPress={this.openHome.bind(this)}>
					<Text style={styles.text}>打开Home页</Text>
				</TouchableHighlight>

				<Text style={styles.welcome} onPress={this.onPressButton.bind(this)}>
					Welcome to Rea212332ct Native!
				</Text>
				<Text style={styles.instructions}>
					To get started, edit App.js
				</Text>
				<Text style={styles.instructions}>
					{instructions}
				</Text>
			</View>
		);
	}
}

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	button: {
		height: 45,
		backgroundColor: '$orange',
		borderColor: '#00FF00',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginLeft: 15,
		marginRight: 15,
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
	}
});
