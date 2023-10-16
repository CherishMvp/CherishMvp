<template>
  <!-- 2022-04-20 19:40:35 
  header部分，顶部栏，简单功能
 -->
  <div class="header">
    <div class="logo">实验室环境监测系统</div>
    <div class="user-info">
      <!-- 下拉事件command，传递多个参数.header包括个人中心和退出登录功能 -->
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user-logo" src="../../../static/img/img.jpg" />
          {{ username }}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        name: 'cherish',
      };
    },
    computed: {
      username() {
        //通过存储session的形式，获取到登录的信息
        let username = sessionStorage.getItem('ms_username');
        return username ? username : this.name;
      },
    },
    methods: {
      handleCommand(command) {
        if (command == 'loginout') {
          sessionStorage.removeItem('ms_username');
          sessionStorage.removeItem('ms_userId');
          this.$router.push('/login');
        } else if (command == 'userCenter') {
          this.$router.push('/userCenter');
        }
      },
    },
  };
</script>
<style scoped>
  .header {
    background-color: #33333;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
    text-align: center;
    color: #add8e6;
  }
  .header .logo {
    float: left;
    width: 220px;
    text-align: center;
    background-color: #33333;
  }
  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
  }
  .user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 40px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }
  .user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
