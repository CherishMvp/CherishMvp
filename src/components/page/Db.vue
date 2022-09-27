<template>
  <div>
    <!-- <p>我是用户数据页</p> -->
    <div class="top">
      <el-input
        v-model="tableDataName"
        placeholder="请输入姓名"
        style="width:240px"
      ></el-input>
      <el-button type="primary" @click="doFilter">搜索</el-button>
      <el-button @click="doReset">重置</el-button>
      <!--  <el-button type="button"
                 @click="doReset">重置</el-button> -->
      <!-- 表格 -->
      <div class="space">
        <el-table :data="tableDataEnd" border style="width: 100%">
          <el-table-column
            prop="id"
            sortable
            label="序号"
            width="180"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            sortable
            label="用户名"
            width="180"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="password"
            sortable
            label="密码"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="tel"
            sortable
            label="电话"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <!-- 点击编辑进入编辑页面进行编辑表格数据 -->
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="deleteRow(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 增加框 -->

        <!-- 编辑框 -->
        <!-- <el-dialog title="编辑用户信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<div>
				<el-form ref="form" :model="editObj" label-width="80px">
					<el-input type="hidden" v-model="editObj.id"></el-input>
					<el-form-item label="用户名">
						<el-input v-model="editObj.name"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="editObj.pass"></el-input>
					</el-form-item>
					<el-form-item label="电话">
						<el-input v-model="editObj.tel"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog> -->

        <!-- 分页 -->
        <div class="space">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalItems"
          >
          </el-pagination>
        </div>
        <!-- 下面这个用来设置点击添加按钮的弹出框，里面可以进行嵌套表格来展示弹出的表格信息,使用下面的:visible.sync来控制显示与否 -->
        <!-- 里面绑定的是我们新设置的值，填写完成后，将我们这个新值塞到页面中所有的数据当中去 -->

        <!-- 下面这个用来设置点击添加按钮的弹出框，里面可以进行嵌套表格来展示弹出的表格信息,使用下面的:visible.sync来控制显示与否 -->
        <!-- 里面绑定的是我们新设置的值，填写完成后，将我们这个新值塞到页面中所有的数据当中去 -->
        <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
          <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
          <!-- 2022-04-20 21:25:27 并且由于是v-model的双向绑定的原因，就算在修改的时候点取消修改，还是会显示缓存内容，但并没有真正的修改，只有点确认才是拉取数据库进行修改操作 -->
          <el-form :model="form">
            <el-form-item label="id" :label-width="formLabelWidth">
              <el-input
                v-model="form.id"
                disabled
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="form.tel" auto-complete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="密码"
                      :label-width="formLabelWidth">
          <el-date-picker v-model="form.password"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item> -->

            <!-- <el-form-item label="性别"
                      :label-width="formLabelWidth">
          <el-select v-model="form.region"
                     placeholder="性别">
            <el-option label="男"
                       value="男"></el-option>
            <el-option label="女"
                       value="女"></el-option>
          </el-select>
        </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <!-- 设置触发更新的方法 -->
            <el-button type="primary" @click="update">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
// 引入axios拉取后端数据，本系统所有的拉取数据库内容都是利用axios库实现。
// 2022-04-20 21:03:24
// 该页面仅有管理员admin可以查看用户信息。并且可以对用户进行操作。
/*
axios介绍{
  Axios是一个基于promise的HTTP库，可以用在浏览器和node.js中   
  主要的作用是用于向后台发起请求
}
*/
import axios from "axios";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      dialogVisible: false,
      dialogVisible1: false,
      form: {},
      tableDataBegin: [],
      tableDataName: "",
      tableDataEnd: [],
      currentPage: 1,
      pageSize: 4,
      totalItems: 10,
      filterTableDataEnd: [],
      flag: false
    };
  },

  handleSelectionChange(val) {
    this.users.id = val;
    console.log("选中的数据集合为:", val);
  },
  created() {},
  mounted() {
    // this.username
    this.querry();
  },
  computed: {
    // 测试代码
    username() {
      let username = sessionStorage.getItem("ms_username");
      // this.form.name = username
      console.log(username);
      if (username !== "test") {
        alert("11");
      }
      return username ? username : this.name;
    }
  },
  methods: {
    querry() {
      axios.get("/api/user/list").then(res => {
        //这里是ES6的写法，get请求的地址
        console.log(res);
        // this.tableDataEnd = res.data
        //将从后台获取到的数据放在Begin上,
        this.tableDataBegin = res.data;
        console.log(this.tableDataEnd);
        //页面初始化时让分页的总条数等于数据的总条数
        this.totalItems = this.tableDataBegin.length;
        //如果分页的页数等于当页要展示的条数
        if (this.totalItems > this.pageSize) {
          for (let index = 0; index < this.pageSize; index++) {
            //那么就将这几条push进展示表格中
            this.tableDataEnd.push(this.tableDataBegin[index]);
          }
        } else {
          //否则就展示首页
          this.tableDataEnd = this.tableDataBegin;
        }
      });
    },

    // 增加数据的方式，单独的设置一些值，用于增加功能，这些值放在对象里面进行设置，然后将这个新增的对象塞到总数据里面
    //  2022-04-20 21:15:34 未用到
    add() {
      this.form = {
        id: "",
        userName: "",
        password: "",
        address: ""
      };
      //   设置点击按钮之后进行显示对话框
      this.dialogFormVisible = true;
    },
    update() {
      //   this.form.date = reformat(this.form.date);
      //    可以在html上面进行设置日期的格式化
      //   将我们添加的信息提交到总数据里面
      // this.tableDataEnd.push(this.form)
      //确认修改
      console.log(this.form.id);
      console.log(this.form.userName);
      console.log(this.form.password);
      console.log(this.form.tel);
      var that = this;
      //网络请求获取数据axios，修改用户信息
      axios
        .post("/api/user/updateUser", {
          id: this.bookid,
          password: this.form.password,
          tel: this.form.tel,
          userName: this.form.userName
        })
        .then(function(res) {
          //请求成功，方法回调
          //回调方法不能用this
          console.log(res.data);
          if (res.data.code == 200) {
            const loading = that.$loading({
              lock: true,
              text: "修改成功",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            // 在注册界面停留两秒钟跳转登录界
            setTimeout(() => {
              loading.close();
              // this.$router.push({ path: '/login' })
              // res.end()
            }, 1500);
          }
        })
        .catch(function(err) {
          //请求失败
          console.log(err);
        });

      // this.dialogVisible = false
      // Vue.set(this.tableData, this.userIndex, this.editObj);

      this.dialogFormVisible = false;
    },
    handleEdit(index, row) {
      // 将数据的index传递过来用于实现数据的回显
      this.form = this.tableDataEnd[index];
      this.currentIndex = index;
      // 设置对话框的可见
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      // 设置类似于console类型的功能
      this.$confirm("永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.tableDataEnd.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    load() {
      var loading = this.$loading({
        lock: true,
        text: "等待跳转",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      // 在注册界面停留两秒钟跳转登录界
      setTimeout(() => {
        loading.close();
        // this.$router.push({ path: '/db' })
        // this.$router.go(0);
        this.querry();
        // res.end()
      }, 3000);
    },

    deleteRow(bookid) {
      console.log(typeof bookid);
      if (confirm("确定要删除吗") == true) {
        var that = this;
        //网络请求获取数据axios，根据id来删除户。id传参到后端。
        axios
          .post("/api/user/del", { bookid: bookid })
          .then(res => {
            //请求成功，方法回调
            //回调方法不能用this
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.doReset();
            console.log(res.data);
          })
          .catch(function(err) {
            //请求失败
            console.log("失败了" + err);
          });
      }

      // window.location.href = 'http://127.0.0.1:8848/HelloVue/book.html'
    },
    cancel() {
      // 取消的时候直接设置对话框不可见即可
      this.dialogFormVisible = false;
    },
    doReset() {
      this.tableDataEnd = [];
      this.tableDataName = "";
      this.filterTableDataEnd = [];
      this.tableDataBegin.forEach((value, index) => {
        if (value.userName) {
          if (value.userName.indexOf(this.tableDataName) >= 0) {
            this.filterTableDataEnd.push(value);
          }
        }
      });
      //页面数据改变重新统计数据数量和当前页
      this.tableDataName = "";
      this.currentPage = 1;
      this.totalItems = this.filterTableDataEnd.length;
      this.querry();
    },
    //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    //用两个变量接收currentChangePage函数的参数
    doFilter() {
      if (this.tableDataName == "") {
        this.$message.warning("查询条件不能为空！");
        this.tableDataName = "";
        return;
      }

      this.tableDataEnd = [];
      //每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = [];
      this.tableDataBegin.forEach((value, index) => {
        if (value.userName) {
          if (value.userName.indexOf(this.tableDataName) >= 0) {
            this.filterTableDataEnd.push(value);
          }
        }
      });
      //页面数据改变重新统计数据数量和当前页
      this.tableDataName = "";
      this.currentPage = 1;
      this.totalItems = this.filterTableDataEnd.length;
      //渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd);
      //页面初始化数据需要判断是否检索过
      this.flag = true;
    },

    //每页展示条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleCurrentChange(1);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      //需要判断是否检索
      if (!this.flag) {
        this.currentChangePage(this.tableDataBegin);
        console.log(this.tableDataEnd);
      } else {
        this.currentChangePage(this.filterTableDataEnd);
        console.log(this.tableDataEnd);
      }
    }, //组件自带监控当前页码

    //点击下一页
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize;
      let to = this.currentPage * this.pageSize;
      this.tableDataEnd = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from]);
        }
      }
    }
  }
};
</script>

<style scoped>
.space {
  margin-top: 30px;
}
.top {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 90%;
  height: 430px;
  margin: -260px 0 0 -520px;
}</style
>>
