<template>
<div>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="账号">
      <el-input v-model="username"></el-input>
    </el-form-item>

    <el-form-item label="昵称">
      <el-input v-model="nickName"></el-input>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {postRequest} from "../../../utils/api";

export default {
  name: "user",
  data() {
    return {
     username:window.sessionStorage.getItem("userName"),
      nickName:  window.sessionStorage.getItem("nickName"),
    }
  },


}
</script>

<style scoped>

</style>
