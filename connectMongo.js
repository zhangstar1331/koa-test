/*
mongoDB网站：
http://mongodb.github.io/node-mongodb-native/
*/
//引入模块
const MongoClient = require('mongodb').MongoClient;
//数据库地址
const url = 'mongodb://localhost:27017';
//数据库名称
const dbName = 'koa';
console.time('start')
//连接数据库
MongoClient.connect(url,(err,client) => {
	const db = client.db(dbName);
	db.collection('user').insertOne({"name":"yixiao","age":"0","sex":"女"},(err,result) => {
		if(err){
			console.log(err)
			return false;
		}
		console.timeEnd('start');
		console.log('数据插入成功')
	})
})