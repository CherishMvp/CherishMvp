
<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    	  <!-- <router-link class="list-group-item" active-class="active" to="/about">About</router-link>
          <router-link class="list-group-item" active-class="active" to="/test">Test</router-link>
          <router-link class="list-group-item" active-class="active" to="/home">home</router-link> -->
      <!-- <Login/> -->
     <router-view/>
     <!-- <router-view name="about"/>
     <router-view name="test"/> -->
  </div>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
   @import "../static/css/main.css";
    @import "../static/css/color-dark.css"; 
          /*深色主题*/
    /* @import "../static/css/theme-green/color-green.css";    */
</style>
