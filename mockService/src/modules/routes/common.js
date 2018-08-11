
let express = require('express');
let router = express.Router();
import {upload, compress} from '../../core/uploader'

module.exports = (router) => {
	//文件上传
	// router.post("/upload", (req, res, next) => {
	// 	console.log(req.body);
	// 	res.send({
	// 		code: 1,
	// 		message: '上传成功111'
	// 	})
	// });
    router.post("/upload", upload.array('file'), function(req, res, next) {
		console.log(req.files)
        if (req.files) {
			let returnObject = [];
			for(let i = 0; i < req.files.length; i++){
				let file = req.files[i];
				// compress(file.path)//压缩图片
				returnObject.push({//这个格式到时候跟服务端统一
					url: file.url
				})
			}
            res.send({
                code: 1,
                message: '上传成功',
                object: returnObject
            })
        } else{
            res.send({
                code: 0,
                message: '上传失败'
            })
        }
    })
}