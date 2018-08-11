let express = require('express'),
    router = express.Router()
;
import importDir from 'import-dir';
const routes = importDir('./routes');

//注册各个接口
Object.keys(routes).forEach(name => {
	routes[name](router)
});

//找不到接口
router.use((req, res, next) => {
	console.log('接口不存在');
	next();
})

module.exports = router;