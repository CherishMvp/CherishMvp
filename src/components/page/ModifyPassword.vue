<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><i class="el-icon-edit"></i> 个人中心</el-breadcrumb-item
        >
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="userContent">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="name" label="用户名称">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item prop="pass" label="密码">
          <el-input
            v-model="form.pass"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" label="确认密码">
          <el-input
            v-model="form.checkPass"
            type="password"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">确定</el-button>
          <el-button @click="onCancle()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  //初始化
  mounted() {
    // this.getUserData();
    this.username;
  },
  computed: {
    username() {
      let username = sessionStorage.getItem("ms_username");
      this.form.name = username;
      console.log(this.form.name);
      return username ? username : this.name;
    }
  },
  methods: {
    onSubmit(formName) {
      const self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post("/api/user/updatePwd", self.form)
            .then(function(res) {
              //请求成功，方法回调
              //回调方法不能用this
              console.log(res.data);
              if (res.data.code == 200) {
                const loading = self.$loading({
                  lock: true,
                  text: "修改成功",
                  spinner: "el-icon-loading",
                  background: "rgba(0, 0, 0, 0.7)"
                });
                // 在注册界面停留两秒钟跳转登录界
                setTimeout(() => {
                  loading.close();
                  self.$router.push({ path: "/login" });
                  // res.end()
                }, 1500);
              }
            })
            .catch(function(err) {
              //请求失败
              console.log(err);
            });
        }
      });
    },
    onCancle() {
      this.$router.push("/userCenter");
    }
  }
};
</script>

<style scoped>
.userContent {
  width: 400px;
  margin: 0 auto;
}
</style>
