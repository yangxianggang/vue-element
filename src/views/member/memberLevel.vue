<template>
  <div>
  》》》》》》》》会员等级页面》》》》》》》》<br>


   >>>>>>>路径匹配方式传递的参数为 {{$route.params.id}}    <br>
  >>>>>>>>路径匹配方式传递参数接收格式为： $route.params + "."+属性名<br>

  》》》》》》》》props传递的参数为 {{id}}<br>
  >>>>>.>>>>>>>接收参数的写法  属性名<br>


</div>

</template>

<script>
export default {
  props:['id'],
  name: "memberLevel",

  //路由钩子方法
  beforeRouteEnter: (to, from, next) => {
    console.log("进入会员等级页面")
   // next();//拦截器，跳到下个路由或者页面    to 我们要去那个组件 from 我们是那个组件过来的
    next(vm => {//回调  存在实例

      vm.getData();
    })
  },
  beforeRouteLeave:(to, from, next) => {
    console.log("离开会员等级页面");
    next();
  },
  methods:{
    getData:function () {
      this.axios({
        method:'get',
        url:'data.json'
      }).then(function (repos){
        console.log(repos)
      }).catch(function (error){
        console.log(error)
      })
    }

  }
}
</script>

<style scoped>

</style>
