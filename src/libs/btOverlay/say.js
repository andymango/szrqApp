// import dialogModule from '../nativeBridge/dialogModule'
import {
	Alert
} from 'react-native';
class Say {
	constructor(obj) {
		if(typeof obj === 'string'){
			obj = {
				title: obj,
				type: 'warning'
			}
		}
		this.type = obj.type;
		this.title = obj.title;

		Alert.alert(this.title)
		// if(this.type === 'success') {
		// 	dialogModule.showSuccessToast(this.title);
		// }else if(this.type === 'error') {
		// 	dialogModule.showFailedToast(this.title);
		// }else if(this.type === 'warning'){
		// 	dialogModule.showToast(this.title);
		// }
	}
}

export default Say;