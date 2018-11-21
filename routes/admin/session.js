var router = require('koa-router')();
router
	//session设置
	.get('/setSession', async (ctx) => {
		ctx.session.count = 5;
		ctx.body = 'session设置成功';
	})
	//session获取
	.get('/getSession', async (ctx) => {
		ctx.body = '当前数量为' + ctx.session.count;
	})
//暴露路由
module.exports = router.routes();