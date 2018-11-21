var router = require('koa-router')();
//引入封装好的操作数据库模块
var Mongo = require('../../module/db.js');
//操作数据库，处理用户信息
	//查询
router
	.get('/find',async (ctx) => {
		//返回来的是一个Promise对象
		var result = await Mongo.find('user',{});
		await ctx.render('user/userList',{
	        list:result
	    });
	})
	//添加
	.get('/add', async (ctx) => {
		await ctx.render('user/add');
	})
	.post('/doAdd', async (ctx) => {
		var addJson = ctx.request.body;
		var data = await Mongo.insert('user',addJson);
		if(data.result.ok == 1){
			ctx.redirect('/admin/user/find');
		}
	})
	//修改
	.get('/edit', async (ctx) => {
		var id = ctx.query.id;
		var result = await Mongo.find('user',{_id:Mongo.getObjectId(id)});
		await ctx.render('user/edit',{list:result[0]});
	})
	.post('/doEdit', async (ctx) => {
		var editJson = ctx.request.body;
		var data = await Mongo.update('user',{_id:Mongo.getObjectId(ctx.request.body.id)},editJson);
		if(data.result.ok == 1){
			ctx.redirect('/admin/user/find');
		}
	})
	//删除
	.get('/delete', async (ctx) => {
		var id = ctx.query.id;
		var data = await Mongo.delete('user',{_id:Mongo.getObjectId(id)});
		if(data.result.ok == 1){
			ctx.redirect('/admin/user/find');
		}
	})

//暴露路由
module.exports = router.routes();