import { Toast } from 'antd-mobile-rn';
// import {
// 	Alert
// } from 'react-native';
class Loading {
	constructor() {
	}

	static instance;

	static show(title){
		const duration = 30;
		let content = title;
		let mask = true;
		let onClose = null;

		instance = Toast.loading(content, duration, onClose, mask)
	}
	static hide(){
		instance && instance.hide();
		instance = null;
	}
}

export default Loading;