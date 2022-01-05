//index.js----Express服务器入口文件

/*
server文件夹里的index.js需要用node index.js命令启动监听端口3000，并在项目的config文件夹里的index.js里，为proxyTable加入
'/api': {
            target: 'http://127.0.0.1:3000/api/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
*/
const routerApi = require('./router');
const bodyParser = require('body-parser'); // post 数据需要
const express = require('express');
const app = express();
 
app.use(bodyParser.json());
 
// 后端api路由
app.use('/api', routerApi);
 
// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');

