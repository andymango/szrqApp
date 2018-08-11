/**
 * 文件上传  https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
 *
 * @author dongxiaochai@163.com
 * @since 2018-01-08
 */
// import config from '../config'
import express from 'express'
import multer from 'multer'
import md5 from 'md5'
import fs from 'fs'
import path from 'path'
import formatDate from '../utils/formatDate'
import gm from 'gm'//http://blog.csdn.net/dreamer2020/article/details/51647885
import bytes from 'bytes'
//图片压缩尺寸
const PIC_SIZES = [{
    name: 'small',
    width: 260,
    height: 260
}]

//递归创建目录 同步方法
function mkdirsSync(dirname) {
    //console.log(dirname);
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

let storage = multer.diskStorage({
    //设置上传文件路径,以后可以扩展成上传至七牛,文件服务器等等
    //Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建
    destination: function(req, file, cb){
        let uploadDir = getUploadDir(req.params.subdir)

        file.url = uploadDir.urlPath

        mkdirsSync(uploadDir.dir)

        cb(null, uploadDir.dir)
    },
    //TODO:文件区分目录存放
    //给上传文件重命名
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split("."),
            dataFormat = formatDate(new Date(), 'yyyyMMddHHmmssSSS'),
            random = Math.ceil(Math.random() * 10000),
            ext = fileFormat[fileFormat.length - 1],
            fileName = `${dataFormat}_${random}.${ext}`//md5(file) + "." + fileFormat[fileFormat.length - 1] //网上的这个方法每次生成的名字都一样
        ;

        file.url += '/' + fileName
        cb(null, fileName);
    }
});

//添加配置文件到muler对象。
export let upload = multer({
    storage: storage,
    //其他设置请参考multer的limits
    // limits: {
    //     fileSize: bytes('2MB') // 限制文件在4MB以内
    // },
    // fileFilter: function(req, files, callback) {
    //     // 只允许上传jpg|png|jpeg|gif格式的文件
    //     var type = '|' + files.mimetype.slice(files.mimetype.lastIndexOf('/') + 1) + '|';
    //     var fileTypeValid = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
    //     callback(null, !!fileTypeValid);
    // }
});

export function getUploadDir(subdir){
    let date = formatDate(new Date(), 'yyyy-MM-dd')
    let originDir = path.resolve(__dirname, '../../')
    // let uploadDir = '/uploads'
    // let urlPath = '/upload'

    if(subdir){
        subdir = `/uploads/${subdir}/${date}`
    } else{
        subdir = `/uploads/${date}`
    }

    return {
        originDir: originDir,
        dir: originDir + subdir,
        urlPath: subdir
    }
}

// //ueditor上传
// export function ueditorUpload(nextHook) {
//     var originDir = getUploadDir().originDir;

//     ueditor(getUploadDir().originDir, nextHook)
// }

//压缩生成等比小图
export function compress(filePath){
    let path = require('path');
    var gmInstance = gm(filePath).antialias(false);
    // .size(function(err, size){
    //     console.log(err, size)
    // })

    if(PIC_SIZES.length){
        for(var i = 0; i < PIC_SIZES.length; i++){
            let size = PIC_SIZES[i]
            let smallPath = filePath.split('.').join(`_${size.name}.`);

            gmInstance
            .resize(size.width, size.height)
            .write(smallPath, function (err) {
              if (err) {
                console.log('图片保存出错: ' + err.toString())
              }
            });
        }
    }
}
