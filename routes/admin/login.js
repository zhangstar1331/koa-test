var router = require('koa-router')();
router
	.get('/login',async (ctx) => {
		//渲染登录页面
		await ctx.render('login/login')
	})
	.post('login/dologin',async (ctx) => {
		//等待异步执行完之后拿到结果
		/**
		Koa中用原生方法拿post请求值
		var data = await common.getPostData(ctx);
		ctx.body = data; //username=134&password=2434
		*/
		//用bodyParser中间件来获取post请求值
		ctx.body = ctx.request.body; //{"username":"12343","password":"23423"}
	})

//暴露路由
module.exports = router.routes();