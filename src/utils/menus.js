import {postRequest} from "./api";



//定义菜单初始化方法
export const initMenu = (router, store) => {

  if (store.state.routes.length > 0) {
     return;
  }
  //请求后端 获取对应数据 data
  postRequest("/api/menu/queryMenu",{}).then(data => {
    console.log(data);
    if (data) {
      //将数据存入vuex
      store.commit('initRoutes',data);
    }

  })

}
