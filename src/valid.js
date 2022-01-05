// 手机号验证
export function validPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  return reg.test(str);
}

// 验证密码   密码，以字母开头，长度在8~18之间，只能包含字母、数字和下划线
export function validPass(str) {
  const reg = /^[a-zA-Z]\w{8,18}$/;
  return reg.test(str);
}

//   验证用户名  用户名要求 数字、字母、下划线的组合，其中数字和字母必须同时存在*
export function validUsername(str) {
  const reg = /^(?![^A-Za-z]+$)(?![^0-9]+$)[0-9A-Za-z_]{4,15}$/;
  return reg.test(str);
}
/*
设置body元素中的背景
 mounted() {
    document
      .querySelector('body')
      .setAttribute('style', 'background-color:#658ea9 ')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  }

  //样式
  <style scoped>
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
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
  margin: -150px 0 0 -180px;
  padding: 40px;
  border-radius: 5px;
  background: rgb(157, 201, 168);
}
element.style {
  background-color: #658ea9;
}
</style>

export default {
    name: 'login',
    data() {
      var validateAccount = (rule,value,callback)=>{
        if(value ===''){
          return callback(new Error("账号不能为空"));
        }else{
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          userName: '',
          password: '',
        },
        rules: {
          userName: [{
            validator: validateAccount,
            trigger: 'blur'
          }],
          password: [{
            validator: validatePassword,
            trigger: 'blur'
          }]
        }
      };
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
            axios.get('/api/login', {
              params: {
                userName: this.ruleForm.userName,
                password: this.ruleForm.password
              }
            })
            .then(res => {
              console.log(res)
              if(res.data.state == 1) {
                this.$router.push({path: '/home'})
                this.$message({
                message: '登陆成功',
                type: 'success'
        })
              }
             else if(res.data.state !== 1) {
                //this.$router.push({path: '/login'})
                this.$message({
                message: '账号或密码错误,请重新输入',
                type: 'error'
        })
              }
            })
       
          }
          //否则
          else {
            this.$message.error('登录失败');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
    document
      .querySelector('body')
      .setAttribute('style', 'background-color:#658ea9 ')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  }
  }

*/
