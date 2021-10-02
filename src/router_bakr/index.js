//路由目录
import Vue from "vue"
import Router from 'vue-router'
//引入login的组件
import Login from '../views/login'
//引入首页的组件
import  main from '../views/main'

import  home from '../views/Home'
//引入会员列表
import MemberList from '../views/member/memberList'
//看引入会员等级
import MemberLevel from '../views/member/memberLevel'

//引入money页面
import money from "../views/money/money";

//错误页面显示404 全局
import Error from '../views/error'

/**
 * 该路由是没有进行菜单列表查询配置的路由信息
 *
 *
 *
 *
 */




Vue.use(Router)
  //向外暴露
export default new Router({
  //history 路径不带#号  历史模式
  //hash  路径带#号   哈希模式
  mode:'history',
  routes:[{

    // 登录页 对象
    path:'/login',
    name:'login',
    //对应的组件
    component:Login
  },
    //************************************首页main 开始.....*************************************
    {
    //首页
    path:'/main',
    name:'main',
    component:main,
    //创建子路由
    children:[
      //会员列表
      {
        path:'/member/memberList',
        name:'MemberList',
        component:MemberList
      },
      //会员等级
      //参数传递 id
      {
      path:'/member/memberLevel/:id',
        name:'MemberLevel',
        component:MemberLevel,
        props:true    //props 传参方式

      },
      //money仓库
      {
        path:'/money/money',
        name:'money',
        component:money
      },
    ]
  },
    //************************************首页main 结束.....*************************************
    //************************************首页Home begin.....*************************************
    {
      //首页
      path:'/Home',
      name:'home',
      component: home,
      //创建子路由
      children:[
        //会员列表
        {
          path:'/member/memberList',
          name:'会员列表',
          component:MemberList
        },
        //会员等级
        //参数传递 id
        {
          path:'/member/memberLevel/:id',
          name:'会员等级',
          component:MemberLevel,
          props:true    //props 传参方式

        },
        //money仓库
        {
          path:'/money/money',
          name:'金钱列表',
          component:money
        },

      ]
    },
    //************************************首页Home  end.....*************************************
    //配置重定向
    {
      path:'/goMain',
      redirect:'/main'

    },
    {
      path:"*",
      component:Error
    }]
})
