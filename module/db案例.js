//引入MongoClient
var MongoClient = require('mongodb').MongoClient;
//引入配置模块
var app = require('./config.js');
class DB {
	static getInstance(){//1.单例 解决多次实例化实例不共享的问题，实现无论几次实例，只连接一次数据库
		if(!DB.instance){//无实际含义，就是为了进行判断
			DB.instance = new DB();//实例化
		}
		return DB.instance;
	}

	constructor(){
		this.dbClient = ''; //放db对象
		this.connect();//先进行连接，则无需在实例化中连接
	}

	connect(){//连接数据库
		return new Promise((resove,reject) => {
			if(!this.dbClient){//判断是否有db对象，是否连接了数据库
				MongoClient.connect(app.dbUrl,(err,client) => {
					if(err){
						reject(err)
					}else{
						this.dbClient = client.db(app.dbName);
						resove(this.dbClient)
					}
				})
			}else{
				resove(this.dbClient)
			}
		})
	}

	find(collectionName,json){
		return new Promise((resove,reject) => {
			this.connect().then((db) => {
				var data = db.collection(collectionName).find(json);
				data.toArray((err,docs) => {
					if(err){
						reject(err);
						return;
					}
					resove(docs)
				})
			})
		})
	}
}

var mydb = DB.getInstance();
setTimeout(() => {
	console.time('start')
	mydb.find('user',{}).then((result) => {
		console.log(result)
		console.timeEnd('start')
	})
},100)

setTimeout(() => {
	console.time('start1')
	mydb.find('user',{}).then((result) => {
		console.log(result)
		console.timeEnd('start1')
	})
},2000)
var mydb1 = DB.getInstance();
setTimeout(() => {
	console.time('start2')
	mydb1.find('user',{}).then((result) => {
		console.log(result)
		console.timeEnd('start2')
	})
},4000)

setTimeout(() => {
	console.time('start3')
	mydb1.find('user',{}).then((result) => {
		console.log(result)
		console.timeEnd('start3')
	})
},6000)