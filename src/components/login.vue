<template>
  <div>
    <div class="ms-title">登录管理系统</div>
    <div class="ms-login">

      <!-- <h3 style="text-align: center;">登录界面</h3> -->
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               
               class="demo-ruleForm">
        <el-form-item  label="账号："
                      prop="userName">
          <el-input placeholder="请输入账号" v-model="ruleForm.userName"
                    autocomplete="off"
                    clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="密码："
                      prop="password">
          <el-input placeholder="请输入密码" type="password"
                    v-model="ruleForm.password"
                    autocomplete="off"
                    show-password
                    clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
 
<script>
import axios from 'axios'
export default {
  name: 'login',
  // inject:['reload'],
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        userName: '',
        password: '',
      },
      rules: {
        userName: [
          {
            validator: validateAccount,
            trigger: 'blur',
          },
        ],
        password: [
          {
            validator: validatePassword,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //           if (valid) {
        //             if(this.ruleForm.account !="admin" || this.ruleForm.password!="123456"){
        // //只是为了做登录效果，所以账号密码写的固定的。
        //              this.$message.error('账号密码不正确');
        //               return false;
        //             }else{//真正项目中登录成功之后，就可以用路由跳转页面
        //                this.$message({
        //           message: '登陆成功',
        //           type: 'success'
        //         });
        //             }
        //           }
        if (valid) {
          // alert('submit!');
          axios
            .get('/api/login', {
              params: {
                userName: this.ruleForm.userName,
                password: this.ruleForm.password,
              },
            })
            .then((res) => {
              console.log(res)
              if (res.data.state == 1) {
                
                this.$router.push({ path: '/readme'})
                // window.location.reload()
                this.$message({
                  message: '登陆成功',
                  type: 'success',
                })
                
              } else if (res.data.state !== 1) {
                //this.$router.push({path: '/login'})
                this.$message({
                  message: '账号或密码错误,请重新输入',
                  type: 'error',
                })
              }
            })
       
       }
        //否则
        else {
          this.$message.error('登录失败')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
  mounted() {
    document
      .querySelector('body')
      .setAttribute('style', 'background-color:#658ea9 ')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
}
</script>
 
<style scoped>
.login-info >>> .el-col {
  background-color: #e5e8ec;
  padding: 2% 5% 0% 2%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -250px;
  text-align: center;
  font-size: 30px;
  color: rgb(175, 241, 192);
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 240px;
  margin: -200px 0 0 -190px;
  padding: 40px;
  border-radius: 22px;
  background: rgb(157, 201, 168);
  box-shadow: #71a071 0px 0px 15px;
}

/* .login-info >>> .el-form-item{
  width:63%;
} */
</style>

