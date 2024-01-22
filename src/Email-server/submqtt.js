const MQTT_SERVICE = 'wss://mqtt.fancyzh.top:8084/mqtt';
const MQTT_USERNAME = 'admin';
const MQTT_PASSWORD = 'adminxxx';

/*利用nodejs来实时订阅监听mqtt发来的环境信息；
当发现异常的时候可以自动发送不同的预警邮件。
  1、发现火焰：发送文字邮件（带有监控系统网址）
  2、发现有害气体：发送拍照指令；ESP32-Cam接收到后立即执行拍照发送邮件。
  *3、后期可通过pm2管理工具，将该node服务部署在云服务器上。无需时刻查看系统。
（需引入nodemailer模块和mqtt模块）
*/

/*
休眠函数sleep
调用 await sleep(1500)

async function main() {
  console.log(1)
  await sleep(1500)
  console.log(2)
}
main()
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('接收前延迟三秒');
  await sleep(3000);
  console.log('三秒过完');

  var sendMail = require('./index');
  const options = {
    connectTimeout: 40000,
    clientId: 'zwt_cherish_node_email8989' + parseInt(Math.random() * 100 + 800, 60),
    keepAliveInterval: 30, //当时间为60时会出现断链问题

    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    clean: true,
  };
  const mqtt = require('mqtt');
  // const mqtt = require('./node_modules/mqtt/dist/mqtt.min.js')
  const client = mqtt.connect(MQTT_SERVICE, options); //指定服务端地址和端口

  client.on('connect', function () {
    console.log('服务器连接成功');
    // connected = client.connected
    client.subscribe('zwt/test', { qos: 1 }); //订阅主题为test的消息
  });
  client.on('message', function (topic, message) {
    // console.log("当前topic：", top);
    // console.log("当前温度：", message.toString());
    console.log('收到来自', topic, '的消息', message.toString());
    //console.log(message)
    // toString()方法，将对象转化成字符串。
    var msg = message.toString();
    var mq135 = 0;
    var mq7 = 0;
    var topic3 = 'zwt/test/aa';
    console.log(msg);
    var DD = msg; //赋值
    /*
  json字符串是json格式的数据用‘’包起来变成字符串。转成对象就可以直接读取
    2、JSON.parse(this.msg)
      {
        将JSON字符串转为对象// 测试用例1：
        let str = '{"a":"test","b":123}';
        console.log(SON.parse(str ));
        输出  { a: 'test', b: 123 }
    3、tostring()方法将mqtt传来的消息转为字符串（因为mqtt传来的是buffer流）
  */
    var ee = JSON.parse(DD);
    console.log(ee);
    console.log(Date());
    console.log('火焰：' + ee.fire);
    console.log('有害气体浓度：' + ee.mq7);
    mq135 = ee.mq135;
    mq7 = ee.mq7;

    // console.log(ee.led)
    // console.log(typeof(ee.temp))
    // console.log('是的是的')
    if (mq7 > 44) {
      console.log('dangerous');
      console.log('发送拍照指令！注意查收');
      // client.publish("zwt/test/aa", { qos: 1 }); //订阅主题为test的消息
      client.publish(topic3, 'photo', { qos: 1 });
      // client.subscribe("zwt/test", { qos: 1 }) //订阅主题为test的消息
    }
    if (ee.fire == 0) {
      console.log('发现火焰');
      console.log('准备发送邮件');
      sendMail();
    } else {
      console.log('环境正常，不必发送邮箱');
    }
  });
}
main();

// const mqtt = require('./node_modules/mqtt/dist/mqtt.min.js')
//var client = mqtt.connect(MQTT_SERVICE, options); //指定服务端地址和端口

/*function mqttMSG() {
  // mqtt连接
  client = mqtt.connect(MQTT_SERVICE, options)

  client.on('connect', (e) => {
    console.log('连接成功:')
   client.subscribe(
      'zwt/test',
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
  client.on('message', (topic, message) => {
    console.log('收到来自', topic, '的消息', message.toString())
    //console.log(message)
    var msg
    msg = message.toString()
    var DD = msg //赋值
    console.log('打印出msg赋给了 DD：'+DD)
    ee = JSON.parse(DD)
    console.log('ddjson序列化后的ee：'+ee)

})

  // 断开发起重连
  client.on('reconnect', (error) => {
    console.log('正在重连:', error)
  })
  // 链接异常处理
  client.on('error', (error) => {
    console.log('连接失败:', error)
  })
}
 mqttMSG()
*/
