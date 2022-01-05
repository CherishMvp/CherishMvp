<template>
	<div>
		<div style="width:100%;height: 100px;">
			测试数据:{{msg}}

			<div >
				<span>温度:{{dd.temp}}</span><br />
				<span>湿度:{{dd.humi}}</span>
			</div>
		</div>
		<div id="chartLineBox" style="width: 100%;height: 360px;">
			<span>温度:{{dd.temp}}</span><br />

		</div> 
<!-- 		<span>温度:{{dd.temp}}</span><br />
		<div class="temp"> 
			   <el-col :span="12" v-for="(item, index) in list" :key="index">
			          <div class="myEcharts" :style="{ height: '300px'  }"></div>
			        </el-col>
					</div> -->
		
	</div>

</template>
<script>
	import mqtt from 'mqtt'
	import {
		MQTT_SERVICE,
		MQTT_USERNAME,
		MQTT_PASSWORD
	} from '../../utils/sysconstant'
	var client
	const options = {
		connectTimeout: 40000,
		clientId: 'mqttjs_54416631',
		username: MQTT_USERNAME,
		password: MQTT_PASSWORD,
		clean: true
	}
	client = mqtt.connect(MQTT_SERVICE, options)

	export default {
		name: 'Monitor',
		data() {

			return {
				msg: '',
				dd: '',
				cc: '',
				list: [
				        {
				          id: 1,
				          value: '',
				          name: "CPU利用率",
				        },
				        {
				          id: 2,
				          value: '',
				          name: "内存利用率",
				        },
				      ],
				
				//成功的显示1
/* 				option: {
					tooltip: {
						formatter: '{a} <br/>{b} : {c}%'
					},
					series: [{
						name: 'Pressure',
						type: 'gauge',
						detail: {
							formatter: '{value}'
						},
						data: [{
							value: this.cc,
							name: 'SCORE'
						}]
					}]
				} */
			 	option :{//echarts设置
				  series: [
				    {
					  name:'温度',	
				      type: 'gauge',
				      center: ['30%', '60%'],
				      startAngle: 200,
				      endAngle: -20,
				      min: 0,
				      max: 90,//最大范围
				      splitNumber: 15,//分成几格
				      itemStyle: {
				        color: '#fd6e1f'
				      },
				      progress: {
				        show: true,
				        width: 30
				      },
				      pointer: {
				        show: false
				      },
				      axisLine: {
				        lineStyle: {
				          width: 30
				        }
				      },
				      axisTick: {
				        distance: -45,
				        splitNumber: 5,
				        lineStyle: {
				          width: 2,
				          color: '#999'
				        }
				      },
				      splitLine: {
				        distance: -52,
				        length: 14,
				        lineStyle: {
				          width: 3,
				          color: '#999'
				        }
				      },
				      axisLabel: {
				        distance: -20,
				        color: '#999',
				        fontSize: 20
				      },
				      anchor: {
				        show: false
				      },
				      title: {
				        show: true,
						offsetCenter: ['0%', '80%'],
						fontSize: 30,
						color: '#fd6e1f'
				      },
				      detail: {
				        valueAnimation: true,
				        width: '60%',
				        lineHeight: 40,
				        borderRadius: 8,
				        offsetCenter: [0, '-15%'],
				        fontSize: 40,
				        fontWeight: 'bolder',
				        formatter: '{value} °C',
				        color: '#fd6e1f'
				      },
				      data: [
				        {
				          value: this.cc,
						  name:'温度'
				        }
				      ]
				    },
					
					
					{
					  name:'湿度'	,
					  type: 'gauge',
					  center: ['70%','60%'],//设置位置
					  startAngle: 200,
					  endAngle: -20,
					  min: 0,
					  max: 90,
					  splitNumber: 15,
					  itemStyle: {
					    color: '#6dff3b'
					  },
					  progress: {
					    show: true,
					    width: 30
					  },
					  pointer: {
					    show: false
					  },
					  axisLine: {
					    lineStyle: {
					      width: 30
					    }
					  },
					  axisTick: {
					    distance: -45,
					    splitNumber: 5,
					    lineStyle: {
					      width: 2,
					      color: '#999'
					    }
					  },
					  splitLine: {
					    distance: -52,
					    length: 14,
					    lineStyle: {
					      width: 3,
					      color: '#999'
					    }
					  },
					  axisLabel: {
					    distance: -20,
					    color: '#999',
					    fontSize: 20
					  },
					  anchor: {
					    show: false
					  },
					  title: {
					    show: true,
						offsetCenter: ['0%', '80%'],
						fontSize: 30,
						color: '#6dff3b'
						
					  },
					  detail: {
					    valueAnimation: true,
					    width: '60%',
					    lineHeight: 40,
					    borderRadius: 8,
					    offsetCenter: [0, '-15%'],
					    fontSize: 40,
					    fontWeight: 'bolder',
					    formatter: '{value} %',
					    color: '#6dff3b'
					  },
					  data: [
					    {
					      value: this.cc,
						  name:'湿度'
						  
					    }
					  ]
					},
					
				    {
				      type: 'gauge',
				      center: ['20%', '50%'],
				      startAngle: 200,
				      endAngle: -20,
				      min: 0,
				      max: 60,
				      itemStyle: {
				        color: '#FD7347'
				      },
				      progress: {
				        show: true,
				        width: 8
				      },
				      pointer: {
				        show: false
				      },
				      axisLine: {
				        show: false
				      },
				      axisTick: {
				        show: false
				      },
				      splitLine: {
				        show: false
				      },
				      axisLabel: {
				        show: false
				      },
				      detail: {
				        show: false
				      },
				      data: [
				        {
				          value: ''
				        }
				      ]
				    }
				  ] 
				  
				  
				  
				  
				}, 
			} //return 到此结束
		}, //data到这里结束
		mounted() {
			//this.drawLine()
			this.chartChange()
			//this.chartChange2()
			
			
		},
		created() {
			this.mqttMSG()
		},
		methods: {

 			chartChange() {
				const myEcharts = this.$echarts.init(document.getElementById('chartLineBox'), 'gauge')
				// 使用刚指定的配置项和数据显示图表。
				
				setInterval(() => {
					//var random = (Math.random() * 100).toFixed(2);
					var random1=this.dd.temp
					 var random2=this.dd.humi
					
					
					// var random = 90;
					this.option.series[0].data[0].value = random1
					this.option.series[1].data[0].value = random2
					// this.option2.series[0].data[0].value = random2
					
					myEcharts.setOption(this.option, true)
					// myEcharts2.setOption(this.option2, true)
					
				},400)

			}, 
			mqttMSG() {
				// mqtt连接
				client.on('connect', (e) => {
					console.log('连接成功:')
					client.subscribe('zwt/test', {
						qos: 1
					}, (error) => {
						if (!error) {
							console.log('订阅成功')
						} else {
							console.log('订阅失败')
						}
					})
				})
				// 接收消息处理
				client.on('message', (topic, message) => {
					console.log('收到来自', topic, '的消息', message.toString())
					//console.log(message)
					this.msg = message.toString()

					var DD = this.msg //赋值
					this.dd = JSON.parse(DD)
					this.option.series[0].data[0].value = this.dd.temp
					this.list[0].value=this.dd.temp
					this.list[1].value=this.dd.humi
					console.log("我是DD里的数据:" + DD)
					console.log(this.list[0].value)
					console.log("温度:" + this.dd.temp)

					console.log("湿度:" + this.dd.humi)
					/* 	var dd=this.dd
						console.log("我是dd里的数据:"+dd) */

					/* 			var dd=this.msg//赋值
								this.DD=Object.values(dd).toString()
								console.log("我是从MQTT接收到的数据:"+this.msg)
								
								console.log("我是DD里的数据:"+this.DD)
								console.log(Object.keys(dd).toString())//取出数组里的key
								console.log(Object.values(dd).toString())//取出数组里的value
								 */

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

		}
	}
</script>
<style>
	.temp{
		height:800px;
	}
	
</style>
