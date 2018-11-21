var router = require('koa-router')();
router
	.get('/art-ejs', async (ctx) => { //art-template中使用ejs语法
		let ejsList = {
			name:'star',
			age:24,
			manage:['111111','22222','33333333','44444444444']
		}
		await ctx.render('art/art-ejs',{ejsList})
	})
	.get('/art-ng', async (ctx) => { //art-template中使用angular语法
		let ngList = {
			name:'star',
			age:24,
			manage:['111111','22222','33333333','44444444444']
		}
		await ctx.render('art/art-ng',{ngList})
	})

//暴露路由
module.exports = router.routes();