<template>
  <div>
    <div class="ms-title">登录管理系统</div>
    <div class="ms-login">

      <!-- <h3 style="text-align: center;">登录界面</h3> -->
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               class="demo-ruleForm">
        <el-form-item prop="userName">
          <el-input placeholder="请输入账号"
                    v-model="ruleForm.userName"
                    autocomplete="off"
                    clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码"
                    type="password"
                    v-model="ruleForm.password"
                    autocomplete="off"
                    show-password
                    clearable></el-input>
        </el-form-item>
        <el-form-item prop="validateCode">
          <el-input v-model="ruleForm.validateCode"
                    class="validate-code"
                    placeholder="验证码"></el-input>
          <div class="code"
               @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </el-form-item>
        <div class="site">
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('ruleForm')">登陆</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="registForm('ruleForm')">注册</el-button>
          </el-form-item>
        </div>
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
    var validateCode = (rule, value, callback) => {
      if (value !== this.identifyCode) {
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }

    return {
      identifyCodes: '1234567890',
      identifyCode: '',
      ruleForm: {
        userName: '',
        password: '',
        validateCode: '',
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
        validateCode: [
          {
            // required: true,
            // message: '请输入验证码',
            validator: validateCode,
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
          sessionStorage.setItem('ms_username', this.ruleForm.userName)
          // alert('submit!');
          axios
            .get('/api/user/login', {
              params: {
                userName: this.ruleForm.userName,
                password: this.ruleForm.password,
              },
            })
            .then((res) => {
              console.log(res)
              if (res.data.state == 1) {
                this.$router.push({ path: '/monitor' })
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
    registForm() {
      this.$router.push('/register')
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
      console.log(this.identifyCode)
    },

  },
  mounted() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
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
.code {
  width: 112px;
  height: 35px;
  border: 1px solid #ccc;
  float: right;
  border-radius: 2px;
}
.validate-code {
  width: 136px;
  float: left;
}
.register {
  font-size: 14px;
  line-height: 30px;
  color: #999;
  cursor: pointer;
  float: right;
}
.site {
  position: relative;
  display: flex;
  justify-content: space-around;
}
el-input {
  width: 100px;
}

/* .login-info >>> .el-form-item{
  width:63%;
} */
</style>

