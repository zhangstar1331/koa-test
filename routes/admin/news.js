var router = require('koa-router')();
router
	.get('/newList',async (ctx) => { //http://localhost:3000/newList?aid=123
		//获取get传值
		console.log(ctx.query);//返回的值为对象   { aid: '123' }
		console.log(ctx.querystring);//返回的值为字符串    aid=123

		console.log(ctx.url);//获取请求路由   /newList?aid=123
		console.log(ctx.request);//获取请求的相关数据
		/*
			{ 
				method: 'GET',
		  		url: '/newList?aid=123',
				header:{ 
					host: 'localhost:3000',
				    connection: 'keep-alive',
				    'upgrade-insecure-requests': '1',
				    'user-agent': 'Mozilla/5.0 (Windows NT 6
				(KHTML, like Gecko) Chrome/69.0.3497.12 Safar
				    accept: 'text/html,application/xhtml+xmlmage/apng,/;q=0.8',
		     		'accept-encoding': 'gzip, deflate, br',
		     		'accept-language': 'zh-CN,zh;q=0.9' 
		     	} 
		 	}
		*/
		ctx.body = '新闻列表'
	})
	//动态路由
	.get('/newcontent/:aid',async (ctx) => {  //http://localhost:3000/newcontent/123
		//获取动态路由的数据
		ctx.body = ctx.params;  // {"aid":"123"}
	})

//暴露路由
module.exports = router.routes();