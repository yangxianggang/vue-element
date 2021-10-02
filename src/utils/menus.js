import {postRequest} from "./api";
import router from "../router";
import store from "../store";
  //import money from "../views/money/money";
// import tab from "../views/tab/tab";
import ta from "element-ui/src/locale/lang/ta";
import money from "../views/money/money";


export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
     return;
  }
  postRequest("/api/menu/queryMenu").then(data => {
    if (data) {

      //格式化Router
      let fmtRoutes = formatRoutes(data);

      //添加路由
      router.addRoutes(fmtRoutes);
      //将数据存入vuex
      store.commit('initRoutes', fmtRoutes)
    }

  })

}
export const formatRoutes = (routes) => {
  let fmtRoutes = [];
  routes.forEach(router => {
    let {
      menu_name,//菜单名
      menu_path,//菜单请求路径
      menuBeans,
      component,
    } = router;
    //递归
    if (menuBeans && menuBeans instanceof Array) {
      menuBeans = formatRoutes(menuBeans)
    }


    let fmRouter = {
      path: menu_path,
      name: menu_name,
      children: menuBeans,
     // component(resolve) {
     //    console.log(component)
     //   if (component != null) {
     //     require(['../views/' + component + '/' + component + '.vue'], resolve)
     //
     //   }
     // }

    }
    fmtRoutes.push(fmRouter)

   });
  return fmtRoutes;
}


//component:resolve => require(['../views/tab/tab.vue'], resolve),
//component:import tab from "../views/tab/tab";
// component:require('../views/tab/tab').default
// component:require('../views/'+ component + '/' + component + '.vue').default
// component:import( '../views/'+component+'/'+component+'.vue')
