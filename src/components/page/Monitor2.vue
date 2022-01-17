<template>
<div>
  <p>监测页面2</p>
  <p>el-switch双向绑定test</p>
  <div>
    <el-switch @change="test" active-value="1" inactive-value="0" v-model="a"/>
  </div>
</div>
</template>
<script>
export default{
  data(){
return{
  a:0
}
  },
  methods:{
    test(val){
      console.log(val)
    }
  }
}
</script>
<style>

</style>
