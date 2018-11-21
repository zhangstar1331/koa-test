//获取post提交值
exports.getPostData = function(ctx){
	//异步返回
	return new Promise((res,rej) => {
		let str = '';
		try {
			ctx.req.on('data',(chunk) => {//获取的值
				str+=chunk;
			})
			ctx.req.on('end',() => {
				res(str)
			})
		}catch(err){
			rej(err)
		}
	})
}