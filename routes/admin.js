var router = require('koa-router')();
var news = require('./admin/news.js');
var art = require('./admin/art.js');
var user = require('./admin/user.js');
var login = require('./admin/login.js');
var session = require('./admin/session.js');
var cookie = require('./admin/cookie.js');
router
	.get('/index', async (ctx) => {
		//ctx.body = "1111"
		let title="star";

	  	await ctx.render('index',{
	        title
	    });
	})
	.get('/list', async (ctx) => {
		var list = ['11111','22222','33333','44444']
		await ctx.render('list',{
			list
		})
	})
	
router.use('/news',news);	
router.use('/art',art);
router.use('/user',user);
router.use('/login',login);
router.use('/session',session);
router.use('/cookie',cookie);
//暴露路由
module.exports = router.routes();