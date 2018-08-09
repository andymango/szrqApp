// import dialogModule from '../nativeBridge/dialogModule'


// // new Confirm('我就是一个弹窗')

// // 一个按钮
// /*new Confirm({
//   // title: "标题",
//   content: "是否提交?",
//   cancelLabel: "",
//   confirmLabel: "确认",
//   onok: ()=>{
//     alert('确定')
//   }
// });*/

// // 两个按钮
// /*new Confirm({
//   title: "标题",
//   content: "是否提交?",
//   cancelLabel: "取消1",
//   confirmLabel: "确认",
//   oncancel: () => {
//      alert('取消')
//   },
//   onok: ()=>{
//      alert('确定')
//   }
// });*/
// class Confirm {
// 	constructor(obj) {
// 		if(typeof obj === 'string'){
// 			obj = {
// 				desc: obj
// 			}
// 		}

// 		this.okText = obj.okText || '确定' // 必填
// 		this.cancelText = obj.cancelText || ''
// 		this.title = obj.title || ''
// 		this.desc = obj.desc || '' // 必填
// 		this.onok = obj.onok || null // 必填
// 		this.oncancel = obj.oncancel || null

// 		dialogModule.showDialog({
// 			title: this.title || "",
// 			content: this.desc,
// 			cancelLabel: this.cancelText,
// 			cancelCallback: this.oncancel,
// 			confirmLabel: this.okText,
// 			confirmCallback: this.onok
// 		});
// 	}
// }

// export default Confirm;
export default () => {}