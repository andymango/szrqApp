/* 公共样式
 * @Author: dongxiaochai@163.com
 * @Date: 2018-08-08 17:37:35
 * @Last Modified by: dongxiaochai@163.com
 * @Last Modified time: 2018-08-11 13:28:13
 */
import cssVariables from './cssVariables';
import EStyleSheet from 'react-native-extended-stylesheet';
const BaseStyle = EStyleSheet.create({
	commonBtn: {
		backgroundColor: '$primaryColorRed',
		borderRadius: 5,
		height: 45,
		borderWidth: 0
	},
	// commonBtnText: {
	// 	color: '$c33',
	// 	borderRadius: 5,
	// 	fontSize: '$f20'
	// },
	commonInput: {

	}
})

export default BaseStyle;