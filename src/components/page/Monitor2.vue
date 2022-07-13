<template>
<!-- 设备状态监测界面;同样类似，结合v-if和else实现状态监测 -->
  <div class="top">
    <!-- <div style="width:100%;height: 100px;"> -->
    <!-- 测试数据:{{msg}} -->

    <div class="button">
      <div id="chartLineBox"
           style="width: 100%;height: 200px;margin-top:-25px">
        <!-- <span>温度:{{dd.temp}}</span><br /> -->
      </div>

    </div>

    <!-- </div> -->
    <!-- <div style="height:100px;text-align:center;display:flex;  justify-content: center;
">
      <el-col :span="12">
        <el-button type="success"
                   size="small"
                   class="conn-btn"
                   style="margin-right: 20px;"
                   :disabled="client.connected"
                   @click="mqttMSG()">
          {{ client.connected ? 'Connected' : 'Connect' }}
        </el-button>
        <el-button @click="change">切换</el-button>

        <el-button v-if="client.connected"
                   type="danger"
                   size="small"
                   class="conn-btn"
                   @click="destroyConnection">
          Disconnect
        </el-button>
      </el-col>
    </div> -->
    <div class="view">

      <span>
        <!-- //当收到的主题中的值为0的时候，才是代表检测到。 -->
        <div v-if="V2">
          <p>空气净化风扇已开启</p>
          <br>
          <img src="@/assets/fs1.png" />

        </div>

        <div v-else>
          <p>空气净化风扇未开启</p>
          <br>
          <img src="@/assets/fs.png" />

        </div>
      </span>
      <span>
        <div v-if="V1">
          <p>窗户已打开</p>
          <br>
          <!-- <img src="./实验室烟雾.gif" alt="hh"> -->
          <img src="@/assets/chuang1.png" />

        </div>

        <div v-else>
          <p>窗户关闭</p>
          <br>
          <img src="@/assets/chuang.png" />

        </div>
      </span>
      <span>
        <div v-if="V3">
          <p>智能灯已打开</p>
          <br>
          <!-- <img src="./实验室烟雾.gif" alt="hh"> -->
          <img src="@/assets/deng1.png" />

        </div>

        <div v-else>
          <p>智能灯未打开</p>
          <br>
          <img src="@/assets/deng.png" />

        </div>
      </span>
      <span>
        <div v-if="V4">
          <p>发现火焰</p>
          <br>
          <!-- <img src="./实验室烟雾.gif" alt="hh"> -->
          <img src="@/assets/huo1.png" />

        </div>

        <div v-else>
          <p>无火焰</p>
          <br>
          <img src="@/assets/huo.png" />

        </div>
      </span>
    </div>
  </div>

</template>
<script>
// import mqtt from 'mqtt'
var mqtt = require('mqtt')

import {
  MQTT_SERVICE,
  MQTT_USERNAME2,
  MQTT_PASSWORD2,
} from '../../utils/sysconstant'

const options = {
  connectTimeout: 40000,
  clientId: 'monitorsssss2_' + parseInt(Math.random() * 100 + 800, 10),
  keepAliveInterval: 10, //当时间为60时会出现断链问题
  username: MQTT_USERNAME2,
  password: MQTT_PASSWORD2,
  clean: true,
}

export default {
  name: 'Monitor2',
  data() {
    return {
      msg: '',
      msg2: {
        dj: 0,
        fs: 0,
      },
      V1: false,
      V2: false,
      V3: false,
      V4: false,
      dd: '',
      cc: '',
      ee: '',
      ee2: '',
      client: {
        connected: true,
      },
      option: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}',
        },
        series: [
          // 第一个为fs的状态,第二个为dj状态,第三个为red,第四个为fire
          {
            radius: '80%', //设置大小
            min: 0,
            max: 1,

            startAngle: 180,
            endAngle: 0,
            splitNumber: 1,
            center: ['15%', '50%'],
            name: '空气净化风扇开关',
            type: 'gauge',
            progress: {
              show: true,
            },
            detail: {
              valueAnimation: true,
              fontSize: 30,
              offsetCenter: [0, '-50%'],
              formatter: function (value) {
                if (value === 1) {
                  return '开'
                } else if (value === 0) {
                  return '关'
                }
                return ''
              },
            },
            // 设置小刻度
            axisTick: {
              splitNumber: 3,
              length: 4,
              lineStyle: {
                width: 2,
                color: '#999',
              },
            },
            // 小刻度的属性
            splitLine: {
              length: 8,
              // show:false,
              lineStyle: {
                width: 3,
                color: '#999',
              },
            },
            data: [
              {
                value: 0,
                name: '空气净化风扇',
              },
            ],
          },
          // MQ135--第二个图
          {
            radius: '80%', //设置大小
            min: 0,
            max: 1,
            splitNumber: 1,
            startAngle: 180,
            endAngle: 0,
            center: ['38%', '50%'],
            name: '窗户开关',
            type: 'gauge',
            progress: {
              show: true,
            },

            detail: {
              valueAnimation: true,
              fontSize: 30,
              offsetCenter: [0, '-50%'],
              formatter: function (value) {
                if (value === 1) {
                  return '开'
                } else if (value === 0) {
                  return '关'
                }
                return ''
              },
            },
            // 设置小刻度
            axisTick: {
              splitNumber: 3,
              length: 4,
              lineStyle: {
                width: 2,
                color: '#999',
              },
            },
            // 小刻度的属性
            splitLine: {
              length: 8,
              // show:false,
              lineStyle: {
                width: 3,
                color: '#999',
              },
            },
            data: [
              {
                value: 0,
                name: '窗户',
              },
            ],
          },
          /*detail: {
              valueAnimation: true,
              fontSize: 60,
              offsetCenter: [0, '70%'],
              formatter: function (value) {
                if (value === 1) {
                  return '发现火焰'
                } else if (value === 0) {
                  return '无火焰'
                }
                return ''
              },
            }, */
          // 第三个图

          {
            radius: '80%', //设置大小
            name: '红外传感器',
            center: ['63%', '50%'], //设置位置
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 1,
            splitNumber: 1,
            itemStyle: {
              color: '#58D9F9',
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
            progress: {
              show: true,
              roundCap: true,
              width: 18,
            },
            pointer: {
              icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
              length: '65%',
              width: 16,
              offsetCenter: [0, '5%'],
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 20,
              },
            },
            axisTick: {
              splitNumber: 1,
              length: 0,
              lineStyle: {
                width: 2,
                color: '#FFB6C1',
              },
            },
            splitLine: {
              // length: 23,
              show: false,
              lineStyle: {
                width: 3,
                color: '#999',
              },
            },
            axisLabel: {
              // show:false,
              distance: 1, //左右两边标签对应的距离
              length: 3,
              color: '#FFB6C1',
              fontSize: 20,
            },

            detail: {
              valueAnimation: true,
              fontSize: 20,
              offsetCenter: [0, '-50%'],
              formatter: function (value) {
                if (value === 1) {
                  return '灯亮'
                } else if (value === 0) {
                  return '灯灭'
                }
                return ''
              },
            },
            data: [
              {
                value: 0,
              },
            ],
          },
          // 第四个图
          {
            radius: '80%', //设置大小
            name: '火焰监测',
            center: ['86%', '50%'], //设置位置
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 1,
            splitNumber: 1,
            itemStyle: {
              color: '#58D9F9',
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
            progress: {
              show: true,
              roundCap: true,
              width: 18,
            },
            pointer: {
              icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
              length: '65%',
              width: 16,
              offsetCenter: [0, '5%'],
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 20,
              },
            },
            axisTick: {
              splitNumber: 1,
              length: 0,
              lineStyle: {
                width: 2,
                color: '#FFB6C1',
              },
            },
            splitLine: {
              // length: 23,
              show: false,
              lineStyle: {
                width: 3,
                color: '#999',
              },
            },
            axisLabel: {
              // show:false,
              distance: 1, //左右两边标签对应的距离
              length: 3,
              color: '#FFB6C1',
              fontSize: 20,
            },

            detail: {
              valueAnimation: true,
              fontSize: 20,
              offsetCenter: [0, '-50%'],
              formatter: function (value) {
                if (value === 1) {
                  return '发现火焰'
                } else if (value === 0) {
                  return '无火焰'
                }
                return ''
              },
            },
            data: [
              {
                value: 0,
              },
            ],
          },
        ],
      },
    } //return 到此结束
  }, //data到这里结束

  mounted() {
    // this.chartChange()
    this.mqttMSG()
    this.chartChange()
  },

  created() {
    // this.test()
  },
  destroyed() {
    // client.end()
  },
  beforeDestroy() {
    //   // client.end();
    //  client.disconnect();
    //   client.close();
    //  this.client.unsubscribe();
    //    this.client.unconnect();
    this.destroyConnection()
  },

  methods: {
    /*chartChange() {
      const myEcharts = this.$echarts.init(
        document.getElementById('chartLineBox'),
        'gauge'
      )
      // 使用刚指定的配置项和数据显示图表。

      setInterval(() => {
        //var random = (Math.random() * 100).toFixed(2);
        // var random1 = this.dd.lx
        // var random2 = this.dd.mq2

        // var random = 90;
        // this.option.series[0].data[0].value = random1
        // this.option.series[1].data[0].value = random2
        // this.option2.series[0].data[0].value = random2

        myEcharts.setOption(this.option, true)
        // myEcharts2.setOption(this.option2, true)
      }, 400)
    },*/

    chartChange() {
      const myEcharts = this.$echarts.init(
        document.getElementById('chartLineBox'),
        'gauge'
      )
      // const myEcharts2 = this.$echarts.init(
      //   document.getElementById('chartLineBox2'),
      //   'gauge'
      // )
      // 使用刚指定的配置项和数据显示图表。

      setInterval(() => {
        //var random = (Math.random() * 100).toFixed(2)

        // var random = 90;
        // this.option.series[0].data[0].value = random1
        // this.option.series[1].data[0].value = random2
        // this.option.series[2].data[0].value = random3
        // this.option.series[3].data[0].value = random4
        // this.option2.series[0].data[0].value = random2

        myEcharts.setOption(this.option, true)
        // myEcharts2.setOption(this.option2, true)
      }, 400)
    },
    change() {
      this.$router.push({ path: '/test' })
    },

    mqttMSG() {
      // mqtt连接
      //  if (client.connected) {
      //   client.end();
      // }
      this.client = mqtt.connect(MQTT_SERVICE, options)

      this.client.on('connect', () => {
        console.log('Connection succeeded!')
        this.client.subscribe(
          ['zwt/test', 'zwt/test/state'],
          {
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
      })
      // 接收消息处理
      this.client.on('message', (topic, message) => {
        console.log('收到来自', topic, '的消息', message.toString())
        if (topic == 'zwt/test/state') {
          var msg2 = message.toString()
          console.log('收到执行器状态信息:' + msg2)
          this.ee2 = JSON.parse(msg2)
          this.msg2.dj = this.ee2.dj
          this.msg2.fs = this.ee2.fs
          console.log('风扇状态为:' + this.msg2.fs)
          console.log('窗户状态为:' + this.msg2.dj)
          this.option.series[0].data[0].value = this.msg2.fs
          this.option.series[1].data[0].value = this.msg2.dj

          // V1为窗户状态;V2为风扇状态;V3为led灯(红外传感器);V4为火焰
          if (this.msg2.dj == 1) {
            this.V1 = true
            console.log('窗户状态为:' + this.V1)
          }
          if (this.msg2.dj == 0) {
            this.V1 = false
            console.log('窗户状态为:' + this.V1)
          }

          if (this.msg2.fs == 0) {
            this.V2 = false
            console.log('风扇状态为:' + this.V2)
          }
          if (this.msg2.fs == 1) {
            this.V2 = true
            console.log('风扇状态为:' + this.V2)
          }
        }
        // console.log(message)
        // 取出red和fire
        if (topic == 'zwt/test') {
          this.msg = message.toString()
          var DD = this.msg //赋值
          this.ee = JSON.parse(DD)

          // this.option.series[2].data[0].value = this.ee.red //红外
          //mqtt发送为0代表有火焰,则在该条件下赋值为1显示火焰
          if (this.ee.fire == 0) {
            this.option.series[3].data[0].value = 1
            this.V4 = true
          } else {
            this.option.series[3].data[0].value = 0
            this.V4 = false
          }
          if (this.ee.red == 1) {
            this.option.series[2].data[0].value = 1
            this.V3 = true
          } else {
            this.option.series[2].data[0].value = 0
            this.V3 = false
          }
        }
        // this.option.series[3].data[0].value = this.ee.fire //火焰
      })
      this.client.on('error', (error) => {
        console.log('Connection failed', error)
      })
      // this.client.on('message', (topic, message) => {
      //   this.receiveNews = this.receiveNews.concat(message)
      //   console.log(`Received message ${message} from topic ${topic}`)
      // })
    },

    close() {
      console.log('111')
    },
    destroyConnection() {
      if (this.client.connected) {
        try {
          this.client.end()
          this.client = {
            connected: false,
          }
          console.log('Successfully disconnected!')
        } catch (error) {
          console.log('Disconnect failed', error.toString())
        }
      }
    },
  },
}
</script>

<style scope>
.top {
  /* margin-top: -30px; */
  /* display: float;
  justify-content: center;
  text-align: center;
  align-items: center; */
  position: absolute;
  left: 50%;
  top: 50%;
  width: 800px;
  height: 430px;
  margin: -210px 0 0 -400px;
}
.button {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.view {
  margin-top: 10px;
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