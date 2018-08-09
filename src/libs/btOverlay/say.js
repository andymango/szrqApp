import { Toast } from 'antd-mobile-rn';
// import {
// 	Alert
// } from 'react-native';
class Say {
	constructor(obj) {
		const duration = 3;
		if(typeof obj === 'string'){
			obj = {
				title: obj
			}
		}
		let content = obj.title;
		let type = obj.type;
		let onClose = obj.onHide || obj.onClose || obj.onhide;
		let mask = !!obj.mask;


		if(obj.type === 'success') {
			Toast.success(content, duration, onClose, mask);
		} else if(obj.type === 'error') {
			Toast.fail(content, duration, onClose, mask)
		} else if(obj.type === 'offline'){
			Toast.offline(content, duration, onClose, mask)
		} else{
			Toast.info(content, duration, onClose, mask)
		}
	}
}

export default Say;