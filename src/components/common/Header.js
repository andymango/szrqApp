import React, {Component} from 'react';
import {
	Text,
	View,
	TouchableWithoutFeedback,
	StatusBar
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import {px2dp, ifIphoneX} from '../../libs/utils';
import btPage from '../../libs/btPage'

const mainColor = '#000';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from "react-native-extended-stylesheet";


export default class Header extends Component {

	render() {
		const {statusBarStyle, title, leftComponent, rightComponent, style, hiddenleftbtn, leftClick, noborder, iconColor, titleClick, textColor, backgroundColor, fontSize} = this.props;
		const leftonclick = leftClick ? leftClick : () => btPage.goBack();

		return (
			<View
				style={[styles.headerbox, style ? style : '', noborder ? {borderBottomWidth: 0} : {borderBottomWidth: 0.5}, backgroundColor ? {backgroundColor} : {mainColor}]}>
				<StatusBar barStyle={statusBarStyle ? `${statusBarStyle}-content` : 'dark-content'}/>
				{
					typeof backgroundColor === "object" ?
						<LinearGradient colors={backgroundColor}>
							<View style={[styles.navbox, style ? style : '', {backgroundColor: 'transparent'}]}>
								{leftComponent ? <View style={styles.iconwidth}>{leftComponent}</View> :
									hiddenleftbtn ? null :
										<TouchableWithoutFeedback onPress={leftonclick}>
											<View style={styles.iconwidth2}>
												{/*<Icon
													name='ios-arrow-back'
													size={px2dp(28)}
													color={iconColor ? iconColor : '#333'}
												/>*/}
												<Text style={styles.iconfont}>&#xe603;</Text>
												<Text style={{color: "#444", fontSize: 15}}>返回</Text>
											</View>
										</TouchableWithoutFeedback>}
								{typeof (title) === "object" ?
									<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>{title}</View> :
									<Text
										style={[styles.navtext, style && style.backgroundColor && style.backgroundColor != mainColor ? {color: '#fff'} : {color: '#fff'}, fontSize ? {fontSize: fontSize} : null]}
										onPress={titleClick}
										numberOfLines={1}
									>{title}</Text>
								}
								<View style={styles.rightbtn}>
									{rightComponent ? rightComponent : null}
								</View>
							</View>
						</LinearGradient> :
						<View
							style={[styles.navbox, style ? style : '', {backgroundColor: backgroundColor ? backgroundColor : ''}]}>
							{leftComponent ? <View style={styles.iconwidth}>{leftComponent}</View> :
								hiddenleftbtn ? null :
									<TouchableWithoutFeedback onPress={leftonclick}>
										<View style={styles.iconwidth2}>
											{/*<Icon
												name='ios-arrow-back'
												size={px2dp(28)}
												color={iconColor ? iconColor : '#666'}
											/>*/}
											<Text style={styles.iconfont}>&#xe603;</Text>
											<Text style={{color: "#444", fontSize: 15}}>返回</Text>
										</View>
									</TouchableWithoutFeedback>}
							{typeof (title) === "object" ?
								<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>{title}</View> :
								<Text style={[styles.navtext, textColor ? {color: textColor} : {color: '#000'}]}
											onPress={titleClick}
											numberOfLines={1}
								>{title}</Text>
							}
							<View style={styles.rightbtn}>
								{rightComponent ? rightComponent : null}
							</View>
						</View>
				}
			</View>

		);
	}
}

const styles = EStyleSheet.create({
	iconfont: {
		fontFamily: 'iconfont',
		fontSize: 17,
		color: '$red'
	},
	headerbox: {
		// ...ifIphoneX({
		// 	paddingTop: 44
		// }, {
		// 	paddingTop: 20
		// }, {
		// 	paddingTop: 0
		// }),
		borderBottomWidth: 1,
		borderBottomColor: '$cee',
		width: '100%'
	},
	navbox: {
		height: 45,
		left: 0,
		right: 0,
		backgroundColor: mainColor,
		position: 'relative',
		top: 0,
		padding: 10,
		flexDirection: 'row',
		// justifyContent: 'center',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	iconwidth: {
		position: 'absolute',
		left: 10,
		bottom: 0,
		height: 45,
		alignItems: 'center',
		flexDirection: 'row',
		zIndex: 5,
		justifyContent: 'center',
	},
	iconwidth2: {
		position: 'absolute',
		left: 10,
		bottom: 0,
		height: 45,
		alignItems: 'center',
		flexDirection: 'row',
		zIndex: 5,
		justifyContent: 'center',
	},

	navtext: {
		fontSize: px2dp(17),
		color: '#000',
		paddingHorizontal: 55,
		alignItems: 'center',
		textAlign: 'center',
		flex: 1,

	},
	rightbtn: {
		position: 'absolute',
		height: 45,
		right: 10,
		top: 0,
		justifyContent: 'flex-end',
		alignItems: 'center',
		zIndex: 5,
		flexDirection: 'row'
	},
});
