// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//主函数
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'

//引入axios
import axios from 'axios'

//引入vuex
import Vuexx from 'vuex'

//引入elementUI 组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入此组件时  store 不要写成Store
import store from "./store";
import {initMenu} from "./utils/menus";


Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuexx)
 //声明使用axios
Vue.prototype.axios = axios;
Vue.config.productionTip = false


//路由跳转之前
/**
 * to 即将进行
 */
router.beforeEach((to, from, next) => {
  //获取登录的状态
  let isLogin = sessionStorage.getItem("isLogin");


  if (isLogin) {
    initMenu(router, store)

    next()
  } else {
    if (to.path == '/login') { //如果是登录页面路径，就直接next()
      initMenu(router, store)
      next();
    } else { //不然就跳转到登录；
      next('/login');
    }
  }

  // if (to.path == '/logout') {//注销
  //   //清空状态
  //   sessionStorage.clear();
  //   next({path: '/login'});
  // } else if (to.path == "login") {
  //   if (isLogin != null) {
  //     next({path: '/main'});
  //   }
  // } else if (isLogin == null) {
  //   next({path: "/login"});
  // }else{
  //   next({path: "/login"});
  //
  // }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
