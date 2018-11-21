//引入MongoClient
var MongoClient = require('mongodb').MongoClient;
//需要使用mongo中的_id，则需要使用ObjectId
var ObjectId = require('mongodb').ObjectId;
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
		return new Promise((resolve,reject) => {
			if(!this.dbClient){//判断是否有db对象，是否连接了数据库
				MongoClient.connect(app.dbUrl,(err,client) => {
					if(err){
						reject(err)
					}else{
						this.dbClient = client.db(app.dbName);
						resolve(this.dbClient)
					}
				})
			}else{
				resolve(this.dbClient)
			}
		})
	}
	//查找
	find(collectionName,json){
		return new Promise((resolve,reject) => {
			this.connect().then((db) => {
				var data = db.collection(collectionName).find(json);
				data.toArray((err,docs) => {
					if(err){
						reject(err);
						return;
					}
					resolve(docs)
				})
			})
		})
	}
	//增加
	insert(collectionName,json){
		return new Promise((resolve,reject) => {
			this.connect().then((db) => {
				db.collection(collectionName).insertOne(json,(err,result) => {
					if(err){
						reject(err)
					}else{
						resolve(result)
					}
				})
			})
		})
	}
	//修改
	update(collectionName,json1,json2){
		return new Promise((resolve,reject) => {
			this.connect().then((db) => {
				db.collection(collectionName).updateOne(json1,{$set:json2},(err,result) => {
					if(err){
						reject(err)
					}else{
						resolve(result)
					}
				})
			})
		})
	}
	//删除
	delete(collectionName,json){
		return new Promise((resolve,reject) => {
			this.connect().then((db) => {
				db.collection(collectionName).removeOne(json,(err,result) => {
					if(err){
						reject(err)
					}else{
						resolve(result)
					}
				})
			})
		})
	}
	//将id转化为mongo可识别的ObjectId
	getObjectId(id){
		return new ObjectId(id);
	}
}

module.exports = DB.getInstance();