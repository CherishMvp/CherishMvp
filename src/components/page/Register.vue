<template>
  <div>
    <div class="crumbs crumbs-register">
      <el-breadcrumb separator="/"
                     class="register-title">
        <el-breadcrumb-item><i class="el-icon-setting"></i>注册</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="userContent">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="80px">
        <el-form-item prop="name"
                      label="用户名称">
          <el-input v-model="form.name"
                    placeholder="请输入用户名称"></el-input>
        </el-form-item>

        <el-form-item prop="pass"
                      label="密码">
          <el-input v-model="form.pass"
                    type="password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass"
                      label="确认密码">
          <el-input v-model="form.checkPass"
                    type="password"
                    placeholder="请再次输入密码"></el-input>
        </el-form-item>

        <!-- <el-form-item prop="sex" label="性别">
					<el-select class="select-sex" v-model="form.sex" placeholder="请选择性别">
						<el-option label="男" value="man"></el-option>
						<el-option label="女" value="woman"></el-option>
					</el-select>
				</el-form-item> -->
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit('form')">确定</el-button>
          <el-button @click="onCancle()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Util from '../../utils/utils'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    // var validateEmail = (rule, value, callback) => {
    // 	if (value === '') {
    // 		callback(new Error('请输入邮箱'));
    // 	} else if (!Util.emailReg.test(this.form.email)){
    // 		callback(new Error('请输入正确的邮箱'));
    // 	} else {
    // 		callback();
    // 	}
    // };
    // var validatePhone = (rule, value, callback) => {
    // 	if (value === '') {
    // 		callback(new Error('请输入手机号'));
    // 	} else if (!Util.phoneReg.test(this.form.phone)){
    // 		callback(new Error('请输入正确的手机号'));
    // 	} else {
    // 		callback();
    // 	}
    // };
    // var validateCard = (rule, value, callback) => {
    // 	if (value === '') {
    // 		callback(new Error('请输入身份证号'));
    // 	} else if (!Util.idCardReg.test(this.form.card)){
    // 		callback(new Error('请输入正确的身份证号'));
    // 	} else {
    // 		callback();
    // 	}
    // };
    return {
      form: {
        name: '',
        account: '',
        pass: '',
        checkPass: '',
        email: '',
        phone: '',
        card: '',
        birth: '',
        sex: '',
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],

        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        /*                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
              
                    email: [
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                    phone: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    card: [
                        { validator: validateCard, trigger: 'blur' }
                    ],
                    birth: [
                        { required: true, message: '请输入出生日期',type: 'date', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请输入性别', trigger: 'blur' }
                    ]*/
      },
    }
  },
  methods: {
    onSubmit(formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          //             self.$http.post('/api/add',self.form).then(function(response) {
          // 	console.log(response);
          // 	self.$router.push('/register-success');
          // }).then(function(error) {
          // 	console.log(error);
          // })

          //   axios
          // .get('/api/addUser', {
          //   params: {
          //     name: this.form.name,
          //     pass: this.form.pass,
          //   },
          // })
          // .then((res) => {
          //   console.log(res)
          //   if (res.data.state == 1) {
          //     this.$router.push({ path: '/register-success' })
          //     // window.location.reload()
          //     this.$message({
          //       message: '登陆成功',
          //       type: 'success',
          //     })
          //   } else if (res.data.state !== 1) {
          //     //this.$router.push({path: '/login'})
          //     this.$message({
          //       message: '账号或密码错误,请重新输入',
          //       type: 'error',
          //     })
          //   }
          // })

          let userName = this.form.name
          let password = this.form.pass
          axios
            .post('/api/user/addUser', {
              userName,
              password,
            })
            .then((res) => {
              console.log('信息添加成功')
              // alert('信息添加成功')
                 this.$message({
                message: '信息添加成功',
                type: 'success',
              })
              this.$router.push({ path: '/register-success' })
            res.end()
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },

    onCancle() {
      this.$router.push('/login')
    },
    getDateTimes(str) {
      var str = new Date(str)
      return str
    },
  },
}
</script>

<style>
.crumbs-register {
  background-color: #324157;
  height: 50px;
  line-height: 50px;
}
.register-title {
  line-height: 50px;
  margin: 0 auto;
  width: 50px;
  font-size: 16px;
}
.userContent {
  width: 400px;
  margin: 0 auto;
}
.select-sex {
  width: 320px;
}
</style>