module.exports = {
  // 基本路径
  publicPath: '', // 相对于 HTML 页面（目录相同）
  //生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  //设置代理
  devServer: {
	port: 8080, //设置输出端口号
	proxy: {
		'/api': {  
			target: 'http://192.168.4.63:3210/', // 目标地址
			changeOrigin: true,// 设置同源 默认false，是否需要改变原始主机头为目标URL,
			ws: true,
			pathRewrite:{
			'^/api': ''
			}
		}	
	}
  }
}