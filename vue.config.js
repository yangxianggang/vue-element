// /**


//此配置仅支持3.0
//  * 使用nodejs 解决跨域·
//  * @type {{}}
//  */
//
// let proxyObj={}
//
// proxyObj['/']={
//   //websocket
//   ws:false,
//   //目标地址
//   target:'http://localhost:8080',
//   //发送请求头host 会被设置target
//   changeOrgin:true,
//   //不重写请求地址
//   pathRewrite:{
//     '^/':'/'
//   }
// }
//
//
//
//
// module.exports={
//   devServer: {
//     host:'localhost',
//     port:'8082',
//     proxy: ''
//   }
// }
