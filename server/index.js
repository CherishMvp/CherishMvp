// node后端服务器
const http = require("http");
const badyParser = require("body-parser");
const express = require("express");
const userApi = require("./api/userApi");
const DBHelper = require("./utils/DBHelper");

let conn = new DBHelper().getConn();

let app = express();
let server = http.createServer(app);

app.use(badyParser.json());
app.use(
  badyParser.urlencoded({
    extended: false
  })
);

// 后端api路由
app.use("/api/user", userApi);

//开启监听方式1
// app.listen(3000);
// console.log('success listen at port:3000......');
// 启动监听方式2
server.listen(3119, () => {
  console.log(" success!! port:3000");
});
