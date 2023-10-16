<!--2022-04-20 21:35:04 监控界面1（温湿度监控）  

其原理都是将订阅的mqtt的消息转存为数组中。然后接着进行实时刷新显示（2s刷新一次）-->
<template>
  <div class="top">
    <div id="line" style="width: 100%; height: 700px; margin-top: 20px"></div>
    <el-col :span="24">
      <!-- <el-button @click="change">切换</el-button> -->
    </el-col>
  </div>
</template>
<script>
  // import initMqtt from '../../utils/initMqtt'
  // 导入mqtt配置
  import mqtt from 'mqtt';
  import { MQTT_SERVICE, MQTT_USERNAME, MQTT_PASSWORD } from '../../utils/sysconstant';
  const options = {
    connectTimeout: 40000,
    clientId: 'hhhhhmonitor_' + parseInt(Math.random() * 100 + 800, 10),
    keepAliveInterval: 10, //当时间为60时会出现断链问题
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    clean: true,
  };
  export default {
    data() {
      return {
        data: [],
        datas: [],
        datass: [],
        datas3: [], //温度
        datas4: [], //湿度
        myChart: {},
        myChart2: {},

        msg: [],
        dd: '',
        temp: '',
        humi: '',
        aa: {
          temp: '',
          humi: '',
        },
        client: {
          connected: false,
        },
      };
    },

    mounted() {
      this.mqttMSG();

      console.log('start');
      this.$nextTick(() => {
        this.drawChart();
        // console.log( this.$moment(this.date).format("hh:mm:ss"))
        this.timer = setInterval(() => {
          this.data.push(this.$moment(this.date).format('hh:mm:ss'));
          //将从MQTT格式化好的数据依次存入各个折线对应的数组中。
          // 只需要三个烟雾传感器的值就可以了
          // s和ss存放折线图数据，每个数组5个。s3和s4各存放一个温湿度的数据
          this.datas.push(this.aa.temp);
          this.datass.push(this.aa.humi); //随机数代替
          this.datas3.push(this.aa.temp);
          this.datas4.push(this.aa.humi); //随机数代替
          // this.datass2.push(this.aa.humi)
          //取数组中最新的1个数值.即温湿度是实时显示一个的
          if (this.data.length > 1) {
            this.datas3.splice(0, 1);
            this.datas4.splice(0, 1);
            // this.datass2.splice(0, 1)
          }
          //取数组中最新的五个数值
          if (this.data.length > 5) {
            // 让时间轴和数据都保持最新的五个
            this.data.splice(0, 1);
            this.datas.splice(0, 1);
            this.datass.splice(0, 1);
            // this.datass2.splice(0, 1)
          }
          var option = this.myChart.getOption();
          option.xAxis[0].data = this.data;
          //将数据以数组的形式赋给各自的data
          option.series[0].data = this.datas;
          option.series[1].data = this.datass;
          option.series[2].data[0].value = this.datas3;
          option.series[3].data[0].value = this.datas4;
          // console.log( option.xAxis)

          console.log('开始打印:');
          //纵坐标值1

          //纵坐标值2

          console.log('temp:' + option.series[2].data[0].value);
          console.log('humi:' + option.series[3].data[0].value);
          this.myChart.setOption(option);
          this.$forceUpdate();
        }, 2000);
      });
    },
    destroyed() {
      clearInterval(this.timer);
      this.client.end();
      console.log('stop-MQTT-connect');
    },
    methods: {
      drawChart() {
        this.myChart = this.$echarts.init(document.getElementById('line'));
        // 绘制图表
        this.myChart.setOption({
          // title: {
          //   text: '温湿度实时图',
          // },
          // 注释
          tooltip: {
            trigger: 'axis',
          },

          grid: {
            containLabel: true,
            top: '55%',
          },
          //工具栏
          toolbox: {
            top: '50%',
            left: 'right',
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none',
              },
              dataView: { readOnly: false },
              magicType: { type: ['line', 'bar'] },
              restore: {},
              saveAsImage: {},
            },
          },
          legend: {
            // 可以通过left，right四个方向属性来设置百分比
            data: ['温度', '湿度'],
            right: 'center',
            // orient: "vertical",
            bottom: '50%',
            // center:["40%","50%"]
          },
          xAxis: {
            type: 'category',
            data: [],
          },
          yAxis: [
            {
              name: '数值',
              type: 'value',
              max: 80,
              min: 5,
              interval: 15,
            },
          ],
          series: [
            // s和ss是折线图，其他不变
            {
              name: '温度',
              type: 'line',
              lineStyle: {
                width: 1,
              },
              //data接收赋值项
              data: this.datas,
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' },
                ],
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }],
              },
            },
            {
              name: '湿度',
              type: 'line',
              lineStyle: {
                width: 1,
              },
              //data接收赋值项
              data: this.datass,
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' },
                ],
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }],
              },
            },
            //温湿度等(3)
            {
              radius: '30%', //设置大小
              name: '温度',
              type: 'gauge',
              center: ['25%', '30%'],
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 60, //最大范围
              splitNumber: 6, //分成几大格
              itemStyle: {
                color: '#5470c6',
              },
              progress: {
                show: true,
                width: 30,
              },
              pointer: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  width: 30,
                },
              },
              axisTick: {
                distance: -45,
                splitNumber: 4, //每个大刻度里面分成几小格
                lineStyle: {
                  width: 2,
                  color: '#999',
                },
              },
              splitLine: {
                distance: -50,
                length: 10,
                lineStyle: {
                  width: 3,
                  color: '#999',
                },
              },
              axisLabel: {
                distance: -5,
                color: '#999',
                fontSize: 14,
              },
              anchor: {
                show: false,
              },
              title: {
                show: true,
                offsetCenter: ['0%', '50%'],
                fontSize: 30,
                color: '#5470c6',
              },
              detail: {
                valueAnimation: true,
                width: '60%',
                lineHeight: 40,
                borderRadius: 8,
                offsetCenter: [0, '-15%'],
                fontSize: 30,
                fontWeight: 'bolder',
                formatter: '{value} °C',
                color: '#5470c6',
              },
              data: [
                {
                  value: this.datas3,
                  name: '温度',
                },
              ],
            },
            //第二个
            {
              radius: '30%', //设置大小
              name: '湿度',
              type: 'gauge',
              center: ['75%', '30%'], //设置位置
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 90,
              splitNumber: 9,
              itemStyle: {
                color: '#6dff3b',
              },
              progress: {
                show: true,
                width: 30,
              },
              pointer: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  width: 30,
                },
              },
              axisTick: {
                distance: -45,
                splitNumber: 4,
                lineStyle: {
                  width: 2,
                  color: '#999',
                },
              },
              splitLine: {
                distance: -50,
                length: 10,
                lineStyle: {
                  width: 3,
                  color: '#999',
                },
              },
              axisLabel: {
                distance: -5,
                color: '#999',
                fontSize: 14,
              },
              anchor: {
                show: false,
              },
              title: {
                show: true,
                offsetCenter: ['0%', '50%'],
                fontSize: 30,
                color: '#6dff3b',
              },
              detail: {
                valueAnimation: true,
                width: '60%',
                lineHeight: 40,
                borderRadius: 8,
                offsetCenter: [0, '-15%'],
                fontSize: 30,
                fontWeight: 'bolder',
                formatter: '{value} %',
                color: '#6dff3b',
              },
              data: [
                {
                  value: this.datas4,
                  name: '湿度',
                },
              ],
            },
          ],
        });
      },
      change() {
        this.$router.push({ path: '/monitor2' });
      },
      mqttMSG() {
        // mqtt连接
        //  if (client.connected) {
        //   client.end();
        // }
        this.client = mqtt.connect(MQTT_SERVICE, options);

        this.client.on('connect', (e) => {
          console.log('连接成功:');
          this.client.subscribe(
            'zwt/test',
            {
              qos: 0,
            },
            (error) => {
              if (!error) {
                console.log('订阅成功');
              } else {
                console.log('订阅失败');
              }
            },
          );
        });
        // 接收消息处理
        /*处理流程：
      *首先连接MQTT后，对收到的主题进行处理。对JSON格式序列化。toString()返回该对象的
      字符串表示。JSON.parse()方法将JSON格式字符串转换为JS对象。要放入echarts数组中的值，先存在aa中的各个属性值中。然后依次写入前五个到各个图表的数组中。
      *
      * 
*/
        this.client.on('message', (topic, message) => {
          console.log('收到来自', topic, '的消息', message.toString());
          //console.log(message)
          this.msg = message.toString();
          this.dd = JSON.parse(this.msg);
          this.aa.mq7 = this.dd.mq7;
          this.aa.mq2 = this.dd.mq2;
          this.aa.mq135 = this.dd.mq135;
          this.aa.temp = this.dd.temp;
          this.aa.humi = this.dd.humi;

          //   //取出主题中的lx和mq2
          console.log(this.aa.mq7);
          console.log(this.aa.mq2);
          console.log(this.aa.mq135);
          console.log(this.temp);
          console.log(this.humi);
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
    },
  };
</script>
<style scoped>
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
    margin: -350px 0 0 -430px;
  }
</style>
