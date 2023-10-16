<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i><span>个人中心</span></el-breadcrumb-item>
        <div class="title">
          <el-breadcrumb-item
            ><span>{{ newDate }}</span></el-breadcrumb-item
          >
        </div>
      </el-breadcrumb>
    </div>
    <div class="userContent">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item prop="name" label="登录用户">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          pass: '',
          checkPass: '',
        },
        // 当前时间
        newDate: new Date(),
      };
    },
    methods: {
      /*getUserData() {
				const self = this;	
				let username = localStorage.getItem('ms_user').name;			
				self.$http.get('/api/user/getUser',{name: username}).then(function(response) {
					console.log(response);
					let result = response.data[0];
					self.form.name = result.username;
					self.form.account = result.account;
					self.form.email = result.email;
					self.form.phone = result.phone;
					self.form.card = result.card;
					self.form.birth = result.birth;
					self.form.sex = result.sex;
				}).then(function(error) {
					console.log(error);
				})
			}		,*/
    },
    computed: {
      username() {
        let username = sessionStorage.getItem('ms_username');
        this.form.name = username;
        console.log(this.form.name);

        return username ? username : this.name;
      },
      // 时间格式化
      // dateFormat () {
      // 	var date = new Date()
      //     var year = date.getFullYear()
      //     /*
      //      * 在日期格式中，月份是从0开始的
      //      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
      //      */
      //     var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      //     var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      //     var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      //     var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      //     var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      //     let week = date.getDay() // 星期
      //     let weekArr = [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]
      //     // 拼接 时间格式处理
      //     return year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes + ':' + seconds + ' ' + weekArr[week]
      // }
    },

    mounted() {
      // this.getUserData()
      let that = this;
      that.username;

      this.timer = setInterval(function () {
        that.newDate = new Date().toLocaleString();
      });
    },
    // 销毁时清除计时器
    beforeDestroy: function () {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
  };
</script>

<style scoped>
  .title {
    display: flex;
    justify-content: center;
  }
  .userContent {
    width: 400px;
    margin: 0 auto;
  }

  .select-sex {
    width: 320px;
  }
</style>
>
