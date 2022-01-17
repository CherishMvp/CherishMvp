<template>
  <!-- 分页测试Demo -->
  <!--     <p>我是控制页</p>
 --> 
  <!-- slot-scope=“scope”
作用域插槽中定义一个对象(这里对象被定义为scope)来存储插槽上绑定的数据的用法

scope.row
使用ElementUI表格模板渲染数据时使用

总体上说明：
当前行数据的获取也会用到插槽,scope相当于一行的数据， scope.row相当于当前行的数据对象
 -->
  <div>
    <el-table :data="csData"
              tooltip-effect="dark"
              border
              stripe
              style="width: 100%">
      <el-table-column type="index"
                       label="序号"
                       align="center"
                       width="100px"></el-table-column>
      <el-table-column prop="name"
                       label="名称"
                       header-align="center"
                       align="center"></el-table-column>
    <el-table-column label="操作"
                       align="center"
                       width=""> 
              <template slot-scope="scope">
                    <el-switch v-model="scope.row.on"
                     active-color="#00A854"
                     active-text="开启"
                     active-value="1"
                     inactive-color="#F04134"
                     inactive-text="关闭"
                     inactive-value="0"
                     @change="changeSwitch(scope.row)"> 
                    </el-switch>
              </template> 
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import mqtt from 'mqtt'
import {
  MQTT_SERVICE,
  MQTT_USERNAME2,
  MQTT_PASSWORD2,
} from '../../utils/sysconstant'
var client
const options = {
  connectTimeout: 40000,
  clientId: 'control_' + parseInt(Math.random() * 100 + 800, 10),
  username: MQTT_USERNAME2,
  password: MQTT_PASSWORD2,
  clean: true,
}
client = mqtt.connect(MQTT_SERVICE, options)
export default {
  data() {
    return {
      //分页测试Demo的return注释
      /*  tableDataBegin: [],
      tableDataName: '',
      tableDataEnd: [],
      currentPage: 1,
      pageSize: 4,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false, */
      //开关Demo测试
       csData: [
        {
          
          name: '一',//报警器
          on: '0',
        },
        { name: '二', //led
        on: '1' },
        {
          name: '三',
          on: 0,
        },
          {
          name: '四',
          on: 1,
        },
      ],
      client: '',
      msg:{
        beep:'',
        led:''
      }, //msg做临时变量,用于临时存放转换后的json数据
     dd:''
    }
  },
  //将create注释,不获取后台数据
  mounted() {
    //this.drawLine()
    // this.chartChange()
    var that = this
    that.mqttMsg()
    //this.chartChange2()
  },
  methods: {
    //开关test函数
    changeSwitch(data) {
      let info
      console.log(data)
      info = data.on
      console.log('开关状态是:', info)
      let topic = 'zwt/test/state'
      var that = this
      if (data.name=='一'&&info==1) {
        client.publish(topic, '{"beep":1}', function (err) {
          if (!err) {
            console.log('开始发送操作')
            console.log('成功发送beep开启命令')
            // that.csData[0].on = 1
            // that.dd.beep = 1
            // console.log('报警器状态:'+'1')
          }
        })
      } 
       if(data.name=='一'&&info==0) {
        client.publish(topic, '{"beep":0}', function (err) {
          if (!err) {
            console.log('开始发送操作')

            console.log('成功发送beep关闭命令')
            // that.dd.beep = 0
            // console.log('报警器状态:'+'0' )
          }
        })
      }

      //second
      if (data.name=='二'&&info==1) {
        client.publish(topic, '{"led":1}', function (err) {
          if (!err) {
            console.log('开始发送操作')
            console.log('成功发送led开启命令')
            // that.csData[0].on = 1
            // that.dd.led = 1
            // console.log('led状态:'+'1' )
          }
        })
      } 
       if(data.name=='二'&&info==0) {
        client.publish(topic, '{"led":0}', function (err) {
          if (!err) {
            console.log('开始发送操作')

            console.log('成功发送led关闭命令')
            // that.dd.led = 0
            // console.log('led状态:'+'0' )
          }
        })
      }
   
    },
    mqttMsg() {
      client.on('connect', function () {
        console.log('连接成功')
        console.log(this.options.clientId)
      })
      client.subscribe(
        'zwt/test/state',        {
          qos: 1,
        },
        (error) => {
          if (!error) {
            console.log('订阅成功')
          } else {
            console.log('订阅失败')
          }
        }
      )

      // 接收消息处理
      client.on('message', (topic, message) => {
        console.log('收到来自', topic, '的消息\n', message.toString())
        //console.log(message) //此时的message是16进制的buffer流,即topic可以转string,json不可以
        this.msg = JSON.parse(message) //转换json格式,赋值给dd
        
        console.log("收到beep指令为:"+this.msg.beep)
        console.log("收到led指令为:"+this.msg.led)

      })
      // 断开发起重连
      client.on('reconnect', (error) => {
        console.log('正在重连:', error)
      })
      // 链接异常处理
      client.on('error', (error) => {
        console.log('连接失败:', error)
      })
    },

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


  <!--   <div>
    <p>我是控制页</p>
    <div style="margin-top:50px">
      <el-input v-model="tableDataName"
                placeholder="请输入姓名"
                style="width:240px"></el-input>
      <el-button type="primary"
                 @click="doFilter">搜索</el-button>
                
      <el-table :data="tableDataEnd"
                border
                style="width: 100%">
        <el-table-column prop="No"
                         sortable
                         label="序号"
                         width="180">
        </el-table-column>
        <el-table-column prop="temp"
                         sortable
                         label="温度"
                         width="180">
        </el-table-column>
        <el-table-column prop="humi"
                         sortable
                         label="湿度">
        </el-table-column>
        <el-table-column prop="lx"
                         sortable
                         label="光照">
        </el-table-column>
         <el-table-column prop="mq2"
                         sortable
                         label="烟雾">
        </el-table-column>
         <el-table-column prop=" CreateTime"
                         
                         label="采集时间">
        </el-table-column>
      </el-table>
    
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
 -->
