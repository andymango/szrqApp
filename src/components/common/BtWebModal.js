import React, {Component} from 'react';
import {
	TouchableWithoutFeedback,
	Modal,
	// Animated,
	View
} from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import {deviceW, deviceH} from 'framework/utils'

export default class BtWebModal extends Component {

	static defaultProps = {
		animationType: 'fade',//none slide fade
		transparent: true,//是否透明显示
	};

	constructor(props) {
		super(props);
		this.state = {
			animationType: this.props.animationType,
			transparent: this.props.transparent
			//translateValue: new Animated.ValueXY({x:0, y:0}), // 动画现在没空做
		};
	}
	startShow = () => {
		console.log('开始显示了');
	}

	/*startAnimation() {
		this.state.translateValue.setValue({x:0, y:0});
		Animated.decay( // 以一个初始速度开始并且逐渐减慢停止。  S=vt-（at^2）/2   v=v - at
			this.state.translateValue,
			{
				velocity: 10, // 起始速度，必填参数。
				deceleration: 0.8, // 速度衰减比例，默认为0.997。
			}
		).start();
	}*/

	componentDidMount() {
		// this.startAnimation();
	}

	render() {
		let modalBackgroundStyle = {
			backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'green',
		};
		let innerContainerTransparentStyle = this.state.transparent
			? {backgroundColor: '#f3f3f3', padding: 20}
			: null;

		return (

			<View>
				{/*<View style={[{flexDirection: 'column',alignItems: 'center', flex: 1}]}>*/}
				<Modal
					animationType={this.state.animationType}
					transparent={this.state.transparent}
					visible={this.props.isShow}
					onRequestClose={() => this.props.changeShow(false)}
					style={{
						flexDirection: 'row', justifyContent: 'center',
						alignItems: 'center',
						alignSelf: 'center',
					}}
					onShow={this.startShow}
				>
					{/*模态框背景mask*/}
					<View style={[styles.maskContainer, modalBackgroundStyle]}
								onStartShouldSetResponder={(evt) => true}
								onResponderGrant={() => this.props.changeShow(false)}>
						<View style={[styles.innerContainer, innerContainerTransparentStyle]}
									onStartShouldSetResponder={(evt) => true}
									onResponderTerminationRequest={(evt) => false}
									onResponderGrant={() => {
									}}>
							{this.props.children}
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = EStyleSheet.create({
	maskContainer: {
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		flex:1,
		zIndex: 10
	},
	innerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	}
});