<template>
 <el-container>
    <el-aside width="200px">
<!--     默认展开索引为1 的菜单-->
     <el-menu :default-openeds="['1']">

       <el-submenu index="1">
         <template slot="title"><i class="el-icon-message"></i>会员管理</template>
         <el-menu-item-group>

            <el-menu-item index="1-1">
<!--              传参方式2种 一种 路径匹配方式 二种 props 传参方式 -->
<!--      传参方式一   路径匹配传参方式      <router-link to="/member/memberLevel/1">会员等级</router-link>-->
<!--              传参方式二  路径匹配传参方式-->
              <router-link :to="{name:'MemberLevel',params:{id:2}}">会员等级</router-link>

               </el-menu-item>
           <el-menu-item index="1-2">
           <router-link to="/member/memberList">会员列表</router-link>
           </el-menu-item>
           <el-menu-item index="1-3">
             <router-link to="/goMain">回到首页</router-link>
           </el-menu-item>
           <el-menu-item index="1-4">
             <router-link to="/money/money">money仓库</router-link>
           </el-menu-item>
         </el-menu-item-group>
       </el-submenu>
       <el-submenu index="2">
         <template slot="title"><i class="el-icon-message"></i>商品管理</template>

         <el-menu-item-group>

            <el-menu-item index="2-1">商品分类</el-menu-item>
           <el-menu-item index="2-2">商品列表</el-menu-item>
         </el-menu-item-group>
       </el-submenu>

     </el-menu>
   </el-aside>
   <el-container>
     <el-header style="text-align: right; font-size: 12px">
       <el-dropdown>
         <i class="el-icon-setting" style="margin-right: 15px"></i>
         <el-dropdown-menu slot="dropdown">
           <el-dropdown-item>用户中心</el-dropdown-item>
           <el-dropdown-item>退出登录</el-dropdown-item>
           <el-dropdown-item>删除</el-dropdown-item>
         </el-dropdown-menu>
       </el-dropdown>
       <span> 欢迎您登录，您的昵称：{{nickName}}，您的账号：{{username}}</span>
     </el-header>

     <el-main>
<!--        对应的路由-->
       <router-view></router-view>
     </el-main>
   </el-container>
 </el-container>

</template>

<script>
export default {
  name: "main",
  computed:{
    username(){
      return window.sessionStorage.getItem("userName");
    },
    nickName(){
      return window.sessionStorage.getItem("nickName");
    }
  },
}


</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
