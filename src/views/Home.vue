<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
      <div  class="title">维修管理</div>

        <el-dropdown @command="commandHandler">
          <i class="el-icon-setting" style="margin-left: 950px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>用户中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span> 欢迎您登录，您的昵称：{{nickName}}，您的账号：{{username}}</span>
      </el-header>
<!--      <el-container>-->
<!--        <el-aside width="200px">-->
<!--          <el-menu @select="menuClick">-->
<!--            <el-submenu index="1">-->
<!--              <template slot="title"><i>导航仪</i></template>-->
<!--              <el-menu-item index="/money/money">金钱</el-menu-item>-->
<!--              <el-menu-item index="/money/money">ddd</el-menu-item>-->
<!--            </el-submenu>-->
<!--          </el-menu>-->
<!--        </el-aside>-->
<!--      </el-container>-->
      <el-container>
        <el-aside width="200px">
          <el-menu router unique-opened>
            <el-submenu :index="index+''" v-for="(item,index) in  routes" :key="index">
              <template slot="title"><i class="el-icon-location"></i><span>{{ item.menuName }}</span></template>
              <el-menu-item-group>
                <el-menu-item :index=children.menuPath v-for="(children,indexx) in item.menuBeans" :key="indexx">{{ children.menuName }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <!--        对应的路由-->
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
            <el-breadcrumb-item :to="{path:'/Home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>

          </el-breadcrumb>

          <router-view></router-view>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {postRequest} from "../utils/api";

export default {
  name: "Home",
  //默认加载数据
  computed: {
    routes() {
        return this.$store.state.routes;
    },

    username() {
      return window.sessionStorage.getItem("userName");
    },
    nickName() {
      return window.sessionStorage.getItem("nickName");
    }
  },
  methods:{
    commandHandler(command){
      if (command=="logout"){
        this.$confirm('是否执行注销操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          window.sessionStorage.removeItem("isLogin");
          window.sessionStorage.removeItem("userName");
          window.sessionStorage.removeItem("nickName");

          this.$store.commit("initRoutes",[]);
          this.$router.replace("/login");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    },
    // menuClick(index){
    //   this.$router.push(index);
    // }
  }


}
</script>

<style scoped>

.homeHeader{
   background: #33CCFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.homeHeader .title{
  font-size: 30px;
  font-family: 华文楷体;
  color: white;
}
.el-header {
  background-color: #33CCFF;
  color: #333;
  line-height: 60px;
}
</style>
