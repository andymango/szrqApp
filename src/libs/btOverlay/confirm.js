import { Modal } from 'antd-mobile-rn';
// import {
// 	Alert
// } from 'react-native';
class Say {
	constructor(obj) {
		if(!obj){
			return;
		}
		const duration = 3;
		if(typeof obj === 'string'){
			obj = {
				title: obj
			}
		}

		let okText = obj.okText || "确定";
		let cancelText = obj.cancelText || "取消";
		let title = obj.title;
		let content = obj.desc;
		let onOk = obj.onOk || obj.onok;
		let onCancel = obj.onCancel;

		Modal.alert(title, content, [
			{ text: cancelText, onPress: onCancel, style: 'cancel' },
			{ text: okText, onPress: onOk },
		]);
	}
}

export default Say;