var router = require('koa-router')();
//cookie设置
router
	.get('/setCookie', async (ctx) => {
		//不需要引入其他插件，直接使用就好
		ctx.cookies.set('userid','12312',{
			maxAge:60*60*1000, //设置多长时间后过期
			//expires:'2018-12-01 00:00:00', //也用于设置过期时间，不过指定的是某一个具体的时间点
			path:'/getCookie' //能够获取cookie的路径，默认是'/'，全部路径
			//domain:'', //能够获取cookie的域名
			//secure:false, //true表示只有https协议可以访问
			//httpOnly:true //是否只是服务器可以访问cookie，默认是true。false则前后端均可以去访问。
		})
		//koa中若设置的cookie值为中文，会报错。可以在存储的时候先将其转换为base64位字符进行存储，获取的时候再将其转换过来
		ctx.cookies.set('userinfo',new Buffer('欢欢').toString('base64'),{
			maxAge:60*60*1000
		})
		ctx.body = '设置cookie成功'
	})
	//cookie获取
	.get('/getCookie', async (ctx) => {
		var data = ctx.cookies.get('userid');
		var userinfo = new Buffer(ctx.cookies.get('userinfo'), 'base64').toString() ;
		ctx.body = '获取cookie' + userinfo + data;
	})
//暴露路由
module.exports = router.routes();