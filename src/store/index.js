import Vue from 'vue'
import Vuex from 'vuex'

//
// Vue.use(Vuex);
//
// //全局state对象 用于保
// //   user: {存所有组件的公共数据
// const state = {
//
//   user:{
//     name:'555'
//   }
// };
//
//
// //监听state对象的值的最新状态（计算属性）
// const getters = {
//   getUser(state) {
//     return state.user
//   }
// };
//
// //唯一一个可以修改state 值的方法(同步执行)
// const mutations = {
//   updateUser(state, user) {
//     state.user = user;
//   }
// };
//
// //异步执行mutations 方法
// const actions = {
//   asyncUpdateUser(context, user) {
//     context.commit("updateUser", user)
//   }
// }
//
// //向外界暴露
//
// export default new Vuex.Store
// {
//      state,
//     getters,
//     mutations,
//     actions
// }

//0-----------------------------------------------
Vue.use(Vuex)

const store = new Vuex.Store({
  strict:true,  // 开启严格模式  确保state 中的数据只能 mutations 修改
  state:{
    user: {
     name: ''
   },
    routes:[]
  },
  mutations:{
    initRoutes(state,data){
      state.routes=data
    }
  }
})

export default store;
