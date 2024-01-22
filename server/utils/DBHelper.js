// 数据库配置参数，连接阿里云服务器数据库，用户名密码等。
// 数据库连接助手
const mysql = require('mysql');

class DBHelper {
  // 获取数据库连接
  getConn() {
    let conn = mysql.createConnection({
      // 数据库连接配置
      host: '127.0.0.1', // 新建数据库连接时的 主机名或ID地址 内容
      user: 'root',
      database: 'user', // 数据库名
      password: '123456', // root 密码
      port: '3306',
      // 设置以字符换的形式展示。不会出现时区少8小时问题。
      dateStrings: true,
    });
    conn.connect();
    return conn;
  }
}

module.exports = DBHelper;
