//路由目录
import Vue from "vue"
import VueRouter from 'vue-router'
//引入login的组件
import Login from '../views/login'
import home from '../views/Home'
//引入会员列表
import MemberList from '../views/member/memberList'
//看引入会员等级
import MemberLevel from '../views/member/memberLevel'
//引入money页面
import money from "../views/money/money";
import  tab from "../views/tab/tab";
import store from "../views/computerinfo/store/store";
import failure from "../views/computerinfo/failure/failure";
import user from "../views/computerinfo/user/user";



/***
 * 换成进行菜单列表后台加载模式进行创建的路由信息
 *
 *
 *
 */

 const routes = [
  {
    // 登录页 对象
    path: '/login',
    name: 'login',
    //对应的组件
    component: Login,
    hidden: true
  },
  {
    //首页
    path: '/Home',
    name: '会员管理',
    component: home,
    //创建子路由
    children: [
      //会员列表
      {
        path: '/member/memberList',
        name: '会员列表',
        component: MemberList
      },
      //会员等级
      //参数传递 id
      {
        path: '/member/memberLevel/:id',
        name: '会员等级',
        component: MemberLevel,
        props: true    //props 传参方式

      },
    //  money仓库
      {
        path: '/money/money',
        name: '金钱列表',
        component: money
      },
      {
        path: '/computer/store/store',
        name: '电脑门店信息列表',
        component: store
      },
      {
        path: '/computer/failure/failure',
        name: '电脑故障信息列表',
        component: failure
      },
      {
        path: '/computer/user/user',
        name: '电脑用户信息',
        component: user
      },
    ]
  }
]
const routerrr = new VueRouter({
  mode:'history',
  routes
})
export default routerrr
