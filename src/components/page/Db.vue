<template>
  <div>
    <p>我是控制页</p>
    <div style="margin-top:50px">
      <el-input v-model="tableDataName"
                placeholder="请输入姓名"
                style="width:240px"></el-input>
      <el-button type="primary"
                 @click="doFilter">搜索</el-button>
                 <!--  <el-button type="button"
                 @click="doReset">重置</el-button> -->
      <!-- 表格 -->
      <el-table :data="tableDataEnd"
                border
                style="width: 100%">
        <el-table-column prop="id"
                         sortable
                         label="序号"
                         width="180">
        </el-table-column>
        <el-table-column prop="userName"
                         sortable
                         label="用户名"
                         width="180">
        </el-table-column>
        <el-table-column prop="password"
                         sortable
                         label="密码">
        </el-table-column>
        <el-table-column prop="tel"
                         sortable
                         label="电话">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[1, 2, 3, 4]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalItems">
      </el-pagination>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      tableDataBegin:[],
      tableDataName: '',
      tableDataEnd: [],
      currentPage: 1,
      pageSize: 4,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false,
    }
  },


  handleSelectionChange(val) {
    this.users.id = val
    console.log('选中的数据集合为:', val)
  },
  created() {
    axios.get('api/user/list').then((res) => {
      //这里是ES6的写法，get请求的地址
      console.log(res)
      // this.tableDataEnd = res.data
      //将从后台获取到的数据放在Begin上,
      this.tableDataBegin=res.data
      console.log(this.tableDataEnd)
      //页面初始化时让分页的总条数等于数据的总条数
    this.totalItems = this.tableDataBegin.length
    //如果分页的页数等于当页要展示的条数
    if (this.totalItems > this.pageSize) {
      for (let index = 0; index < this.pageSize; index++) {
        //那么就将这几条push进展示表格中
        this.tableDataEnd.push(this.tableDataBegin[index])
      }
    } else {
      //否则就展示首页
      this.tableDataEnd = this.tableDataBegin
    }
    
    })
  },
  methods: {
    //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    //用两个变量接收currentChangePage函数的参数
    doFilter() {
      if (this.tableDataName == '') {
        this.$message.warning('查询条件不能为空！')
        return
      }
      this.tableDataEnd = []
      //每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = []
      this.tableDataBegin.forEach((value, index) => {
        if (value.userName) {
          if (value.userName.indexOf(this.tableDataName) >= 0) {
            this.filterTableDataEnd.push(value)
          }
        }
      })
      //页面数据改变重新统计数据数量和当前页
      this.currentPage = 1
      this.totalItems = this.filterTableDataEnd.length
      //渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd)
      //页面初始化数据需要判断是否检索过
      this.flag = true
    },

    
    //每页展示条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.handleCurrentChange(1)
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      //需要判断是否检索
      if (!this.flag) {
        this.currentChangePage(this.tableDataBegin)
        console.log(this.tableDataEnd)
      } else {
        this.currentChangePage(this.filterTableDataEnd)
        console.log(this.tableDataEnd)
      }
    }, //组件自带监控当前页码

    //点击下一页
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize
      let to = this.currentPage * this.pageSize
      this.tableDataEnd = []
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from])
        }
      }
    },
  },
}
</script>