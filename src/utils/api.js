/**
 * 配置响应拦截器   页面提示信息
 */


//引入axios
import axios from 'axios'

//单独引用 message
import {Message} from "element-ui";

import router from '../router'

//响应的拦截器
//success  成功调到接口
axios.interceptors.response.use(success => {
    //业务逻辑判断
  if (success.status && success.status == 200) {
    //data.code 后台携带的值
    if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
      //提示信息
      Message.error({message: success.data.message});
      return;
    }
    //成功
    if (success.data.message) {
      Message.success({message: success.data.message})
    }

  }
  return success.data;


}, error => {
  console.log(error)
   if (error.response.code == 504 || error.response.code == 404) {
    Message.error({message: '失败'})
  } else if (error.response.code == 403) {
    Message.error({message: '失败 权限不足'})
  } else if (error.response.code == 401) {
    Message.error({message: '尚未登录 请登录'});
    router.replace("/login")
  } else {
    if (error.response.data.message) {
      Message.error({message: error.response.data.message});

    } else {
      Message.error({message: '未知错误'});
    }
  }
  return;
});

let base = '';
export const postRequest=(url,params)=>{
  return axios({
    method:'post',
    url: `${base}${url}`,
    data:params
  })
}

//
// let base = '';
// export const postRequest = (url, params) => {
//   return axios({
//     method: 'post',
//     url: `${base}${url}`,
//     data: params,
//     transformRequest: [function (data) {
//       // Do whatever you want to transform the data
//       let ret = ''
//       for (let it in data) {
//         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//       }
//       return ret
//     }],
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   });
// }
