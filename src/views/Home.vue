<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
      <div class="title">不知道叫啥</div>

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
      <el-container>
        <el-aside width="200px">
          <el-menu router unique-opened>
            <el-submenu :index="index+''" v-for="(item,index) in  routes" :key="index" v-if="!item.hidden">
              <template slot="title"><i class="el-icon-location"></i><span>{{ item.name }}</span></template>
              <el-menu-item-group>
                <el-menu-item :index=children.path v-for="(children,indexx) in item.children" :key="indexx">{{ children.name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <!--        对应的路由-->
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
            <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
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
  computed: {
    routes() {
      console.log( 'this.$store.state.routes')
      console.log( this.$store.state.routes)
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
    }
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
