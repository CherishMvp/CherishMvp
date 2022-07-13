// 新增node服务。考虑到夜间休息的时候，无人看管。可以在发现危险的时候自动控制发送邮件提醒

const MQTT_SERVICE = 'wss://www.ai0626.top:8084/mqtt'
const MQTT_USERNAME = 'node-service'
const MQTT_PASSWORD = '123'

var email=require('./')
const options = {
  connectTimeout: 40000,
  clientId: 'zwt_cherish_node_email8989' + parseInt(Math.random() * 100 + 800, 60),
  keepAliveInterval: 30, //当时间为60时会出现断链问题

  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
  clean: true,
}
var mq135=0;
const mqtt = require("mqtt");
// const mqtt = require('./node_modules/mqtt/dist/mqtt.min.js')
const client = mqtt.connect(MQTT_SERVICE, options); //指定服务端地址和端口

client.on("connect", function () {
  console.log("服务器连接成功");
  // connected = client.connected
  client.subscribe("zwt/test", { qos: 1 }); //订阅主题为test的消息
});
// var t2=setInterval(() => {
  client.on("message", function (topic, message) {
  // console.log("当前topic：", top);
  // console.log("当前温度：", message.toString());
  var num=1;
  var topic3='zwt/test/aa'
  console.log('收到来自', topic, '的消息', message.toString())
  //console.log(message)
  var msg = message.toString()
  console.log(msg)
  var DD = msg //赋值
  var ee = JSON.parse(DD)
  console.log(ee)
  console.log('温度：'+ee.temp)
  mq135=ee.mq135
  console.log('有害气体：'+mq135)
  
  if(mq135>43){
    console.log('dangerous')
    console.log(num++)

    // client.publish("zwt/test/aa", { qos: 1 }); //订阅主题为test的消息
    client.publish(topic3, 'photo',{ qos: 1 })
    // client.subscribe("zwt/test", { qos: 1 }) //订阅主题为test的消息
  }
  })


