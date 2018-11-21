//引入koa模块
var Koa = require('koa');
//引入path以便获取路径
var path = require('path');
//引入实例化路由  不同于express，这个必须得引入
var router = require('koa-router')();
//引入路由模块
var admin = require('./routes/admin.js');
//引入模板引擎，以便于渲染页面
var views = require('koa-views');
//引入模板
var ejs = require('ejs');
/*
art-template 模板引擎 
相较于上面的ejs和其他模板引擎，它渲染页面更加快速，而且同时支持ejs语法和angular语法 
安装：
	npm install --save art-template
	npm install --save koa-art-template
*/
var render = require('koa-art-template');
//引入自定义模块
var common = require('./module/common.js');
//引入koa-bodyparser模块用于获取post请求参数
var bodyParser = require('koa-bodyparser');
//引入koa-session用于设置session
var session = require('koa-session');
//引入静态资源中间件
var static = require('koa-static');
//实例化koa模块
var app = new Koa();
/*
配置模板
写法一：
app.use(views('views',{
    extension:'ejs'  //应用ejs模板引擎,模板以.ejs结尾
}))
*/
app.use(views(__dirname + '/views', { //模板路径
	map:{
		html:'ejs' //模板名称 模板需要以.html结尾  需要安装:npm install ejs --save
	}
}))
//配置art-template模板
render(app, {
	root: path.join(__dirname, 'views'), //文件路径
	extname: '.html', //文件以什么结尾
	debug: process.env.NODE_ENV !== 'production'  //开启调试模式 
});
//配置公共信息
app.use(async (ctx,next) => {
	ctx.state.name = 'star';
	await next();
})
//中间件的使用
app.use(async (ctx,next) => {
	//路由找不到返回404页面
	await next();
	if(ctx.status == 404){
		ctx.body = '这是一个404页面'
	}
})
//配置koa-bodyparser中间件
app.use(bodyParser());
//配置session
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000,	//cookie过期时间
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, //true只能在服务器端获取cookie，false客户端和服务器端均可获取
  signed: true, //设置签名
  rolling: true, //每当操作页面的时候，重新去设置cookie的时长
  renew: true //每当cookie快要到期的时候重新去设置cookie的时长
};
app.use(session(CONFIG,app));
//配置静态资源中间件
app.use(static('.'));
app.use(static('static'));
app.use(static(__dirname + '/static'));
//配置路由
router.get('/',async (ctx) => { //ctx为上下文内容，里面包含了很多东西，有requery,response,writeHead,end等
		ctx.body = '这是首页'
	})
router.use('/admin',admin)
//启动路由
app
	.use(router.routes())
	.use(router.allowedMethods()); //根据之前配置路由返回的状态，针对一些失败的设置response响应头
//监听端口
app.listen(3000);