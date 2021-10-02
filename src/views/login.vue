<template>

  <div class="firstdemo" style="margin-right: 140px;">
    <el-form :model="form" ref="form" label-width="100px" :rules="rules">
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label-width="70px" style="margin-top: 150px;">
            <span><font color="pink" size="3">注册登录页面</font></span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="账户：" prop="userName">
            <el-input type="text" placeholder="请输入用户名" v-model="form.userName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="密码：" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item>
            <el-button type="primary" @click="onsubmit('form')">登录</el-button>
            <el-button>注册</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
 import {postRequest} from "../utils/api";

 export default {
  name: "login",
  data() {
    return {
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{
          required: true,
          message: "请输入用户名",
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: "请输入密码",
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    onsubmit(formName) {
      //进行表单验证
       this.$refs[formName].validate((valid) => {
        if (valid) {           //配置登录成功的一个参数状态 用在main.js 跳转路由之前
         sessionStorage.setItem("isLogin",'true')
          //配置store 放入对象
         // this.$store.dispatch("asyncUpdateUser",{name:this.form.userName})

          //请求后台

           postRequest("/api/user/login",this.form).then(resp=>{
             if (resp){
                window.sessionStorage.setItem("userName",  resp.data.userName);
               window.sessionStorage.setItem("nickName",  resp.data.nickName);
               //跳转到main页面，有对应的布局，其中money 是完整的CRUD 操作
              //  this.$router.push({name:'main',params: resp.data})
               //跳转到home首页
                this.$router.replace("/Home")
            }
          })
        } else {

           return false;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
