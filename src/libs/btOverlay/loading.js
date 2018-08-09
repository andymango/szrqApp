import { Toast } from 'antd-mobile-rn';
// import {
// 	Alert
// } from 'react-native';
class Loading {
	constructor() {
	}

	static show(title){
		const duration = 30;
		let content = title;
		let mask = true;
		let onClose = null;

		Toast.loading(content, duration, onClose, mask)
	}
	static hide(){
		Toast.hide();
	}
}

export default Loading;