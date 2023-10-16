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

  <div class="top">
    <div style="margin-bottom: 20px">
      <span>控制操作说明:switch的开关发送对应的MQTT主题; 同时switch与设备的状态是双向绑定的,即在发送指令成功后, 只有设备返回了状态信息,switch才会改变</span>
    </div>
    <!-- 操作表格，element的table组件实现 -->
    <div>
      <el-table :data="csData" tooltip-effect="dark" border stripe style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="100px"></el-table-column>
        <el-table-column prop="name" label="名称" header-align="center" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.on"
              active-color="#00A854"
              active-text="开启"
              active-value="1"
              inactive-color="#F04134"
              inactive-text="关闭"
              inactive-value="0"
              @change="changeSwitch(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 2022-04-20 20:55:32 状态显示使用内嵌语法 v-if和v-else来达到目的 -->
    <div class="view">
      <span>
        <!-- //当收到的主题中的值为0的时候，才是代表检测到。 -->
        <div v-if="V2">
          <p>空气净化风扇已开启</p>
          <br />
          <img src="@/assets/fs1.png" />
        </div>

        <div v-else>
          <p>空气净化风扇未开启</p>
          <br />
          <img src="@/assets/fs.png" />
        </div>
      </span>
      <span>
        <div v-if="V1">
          <p>窗户打开</p>
          <br />
          <!-- <img src="./实验室烟雾.gif" alt="hh"> -->
          <img src="@/assets/chuang1.png" />
        </div>

        <div v-else>
          <p>窗户未打开</p>
          <br />
          <img src="@/assets/chuang.png" />
        </div>
      </span>
    </div>
  </div>
</template>

<script>
  // 导入MQTT配置项目，服务器，用户名密码等
  import mqtt from 'mqtt';
  import { MQTT_SERVICE, MQTT_USERNAME2, MQTT_PASSWORD2 } from '../../utils/sysconstant';
  // 生成随机clientid，当多个用户同时查看，不会挤下线。
  const options = {
    connectTimeout: 40000,
    clientId: 'control_' + parseInt(Math.random() * 100 + 800, 10),
    username: MQTT_USERNAME2,
    password: MQTT_PASSWORD2,
    clean: true,
  };
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
          // 和dj绑定
          {
            name: '窗户', //报警器
            on: '0',
          },
          // 和fs绑定
          {
            name: '空气净化风扇', //led
            on: '0',
          },
          {
            name: '拍照发送邮件',
            on: '0',
          },
          {
            name: '四',
            on: '0',
          },
        ],
        client: '',
        message: 'hello vue',
        V1: false,
        V2: false,
        msg: {
          beep: '',
          led: '',
          on: '',
          on2: '',
          fire: '',
          mq7: '',
        }, //msg做临时变量,用于临时存放转换后的json数据
        dd: '',
      };
    },
    //将create注释,不获取后台数据
    mounted() {
      //this.drawLine()
      // this.chartChange()
      var that = this;
      that.mqttMsg();
      //this.chartChange2()
    },
    beforeDestroy() {
      this.client.end();
      console.log('stop-MQTT-connect');
    },
    methods: {
      //开关函数，发布的控制的MQTT主题是zwt/test/aa
      changeSwitch(data) {
        let info;
        console.log(data);
        info = data.on;
        // this.csData[2].on = this.msg.on

        console.log('开关状态是:', info);
        let topic = 'zwt/test/aa';

        var that = this;
        // 发送的topic主题，11和10分别代表设备1（窗户）的开关。21和20为设备2（风扇）的开关
        // 操作开关的状态代表发送不同的主题。且开关状态与设备返回的状态信息同步
        if (data.name == '窗户' && info == 1) {
          this.client.publish(topic, '11', function (err) {
            if (!err) {
              console.log('开始发送操作');
              console.log('成功发送设备1开启命令');
              // alert('已发送开窗指令!')
              that.$message({
                message: '已发送开窗指令!',
                type: 'success',
              });
              // that.csData[0].on = 1
              // that.dd.beep = 1
              // console.log('报警器状态:'+'1')
            }
          });
        }
        if (data.name == '窗户' && info == 0) {
          // var that=this

          this.client.publish(topic, '10', function (err) {
            if (!err) {
              console.log('开始发送操作');
              // alert('已发送关窗指令!')
              that.$message({
                message: '已发送关窗指令!',
                type: 'success',
              });

              console.log('成功发送设备1关闭命令');
              // that.dd.beep = 0
              // console.log('报警器状态:'+'0' )
            }
          });
        }

        //second
        if (data.name == '空气净化风扇' && info == 1) {
          this.client.publish(topic, '21', function (err) {
            if (!err) {
              console.log('开始发送操作');

              // alert('已发送开空气净化风扇指令!')
              that.$message({
                message: '已发送开空气净化风扇指令!',
                type: 'success',
              });
              console.log('成功发送设备2开启命令');
              // that.csData[0].on = 1
              // that.dd.led = 1
              // console.log('led状态:'+'1' )
            }
          });
        }
        if (data.name == '空气净化风扇' && info == 0) {
          this.client.publish(topic, '20', function (err) {
            if (!err) {
              console.log('开始发送操作');
              // alert('已发送关空气净化风扇指令!')
              that.$message({
                message: '已发送关空气净化风扇指令!',
                type: 'success',
              });
              console.log('成功发送设备2关闭命令');
              // that.dd.led = 0
              // console.log('led状态:'+'0' )
            }
          });
        }
        if (data.name == '拍照发送邮件' && info == 1) {
          this.client.publish(topic, 'photo', function (err) {
            if (!err) {
              console.log('发送烟雾预警');
              // alert('已发送拍照指令!')
              that.$message({
                message: '已发送拍照指令!',
                type: 'success',
              });
              console.log('成功发送烟雾预警命令');
              // that.dd.led = 0
              // console.log('led状态:'+'0' )
            }
          });
        }
        if (data.name == '拍照发送邮件' && info == 0) {
          console.log('不进行操作');
        }
      },
      mqttMsg() {
        this.client = mqtt.connect(MQTT_SERVICE, options);

        this.client.on('connect', function () {
          console.log('连接成功');
          console.log(this.options.clientId);
          function a() {}
        });
        this.client.subscribe(
          // 此页面只要接收设备发来的烟雾和火焰的信息就行。
          // （或者接收当超出某一阈值的时候，做出反应）
          // 只需订阅state状态主题就行['zwt/test', 'zwt/test/state']
          'zwt/test/state',
          // 'zwt/test/control',

          {
            qos: 1,
          },
          (error) => {
            if (!error) {
              console.log('订阅成功');
            } else {
              console.log('订阅失败');
            }
          },
        );

        // 接收消息处理

        this.client.on('message', (topic, message) => {
          console.log('收到来自', topic, '的消息\n', message.toString());
          //  2022-04-05 23:19:08加入设备状态识别
          if (topic == 'zwt/test/state') {
            var msg2 = message.toString();
            console.log('收到执行器状态信息:' + msg2);
            this.ee2 = JSON.parse(msg2);
            this.msg.dj = this.ee2.dj;
            this.msg.fs = this.ee2.fs;
            console.log('风扇状态为:' + this.msg.fs);
            console.log('窗户状态为:' + this.msg.dj);
            // v-if 里面，第一个为true的情况，else才是false情况
            // V2为风扇状态，V1为窗户，舵机状态
            if (this.msg.dj == 1) {
              this.V1 = true;
              this.csData[0].on = '1';
              // this.csData
              console.log(typeof this.csData[0].on);
            }
            if (this.msg.dj == 0) {
              this.V1 = false;
              this.csData[0].on = '0';
            }
            // this.V1 = this.msg.on
            // this.V2=this.msg.on2
            // console.log(this.V2)
            //用mq7来判断。
            if (this.msg.fs == 0) {
              this.V2 = false;
              this.csData[1].on = '0';
              //  this.$message({
              //   message: '空气净化风扇已关闭!',
              //   type: 'success',
              // })
            }
            if (this.msg.fs == 1) {
              this.V2 = true;
              this.csData[1].on = '1';
            }
          }

          //console.log(message) //此时的message是16进制的buffer流,即topic可以转string,json不可以
          // this.msg = JSON.parse(message) //转换json格式,赋值给dd
          // console.log('收到火焰指令为:' + this.msg.fire) //火焰0才是检测到
          // // console.log('收到控制指令为:' + this.msg) //显示订阅的第二个主题 control的信息
          // console.log('收到MQ7指令为:' + this.msg.mq7)
          // console.log('根据接收到的MQTT指令来显示烟雾和火焰预警')

          // console.log(data)
          // 收到的消息中，on为火焰：0代表有火焰，开报警。1为没有火焰，关报警。
          // on2为mq7的烟雾浓度。实际测得，当>100的时候，代表有有害气体产生。
          // v-if 里面，第一个为true的情况，else才是false情况
          // if (this.msg.fire == 0) {
          //   this.V1 = false
          // }
          // if (this.msg.fire == 1) {
          //   this.V1 = true
          // }
          // // this.V1 = this.msg.on
          // // this.V2=this.msg.on2
          // // console.log(this.V2)
          // //用mq7来判断。
          // if (this.msg.mq7 > 25) {
          //   this.V2 = false
          // }
          // if (this.msg.mq7 < 25) {
          //   this.V2 = true
          // }

          //当收到的主题中的值为0的时候，才是代表检测到。
          console.log('是否显示：' + this.V1);
        });
        // 断开发起重连
        this.client.on('reconnect', (error) => {
          console.log('正在重连:', error);
        });
        // 链接异常处理
        this.client.on('error', (error) => {
          console.log('连接失败:', error);
        });
      },

      //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
      //用两个变量接收currentChangePage函数的参数
      doFilter() {
        if (this.tableDataName == '') {
          this.$message.warning('查询条件不能为空！');
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
      },
    },
  };
</script>

<style scoped>
  .top {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 800px;
    height: 430px;
    margin: -200px 0 0 -400px;
  }
  .view {
    margin-top: 30px;
    text-align: center;
    justify-content: space-around;
    display: flex;
  }
  img {
    width: 130px;
    height: 130px;
    border-radius: 12px;
  }
</style>

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
