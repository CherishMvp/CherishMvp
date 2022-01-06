// 数据库连接助手
const mysql = require('mysql');

class DBHelper{
    // 获取数据库连接
    getConn(){
        let conn = mysql.createConnection({
            // 数据库连接配置
            host: 'www.ai0626.top',      // 新建数据库连接时的 主机名或ID地址 内容
            user: 'cherish', 
            database: 'user',      // 数据库名
            password: 'Qaz123plm',   // root 密码
            port: '3306'
        });
        conn.connect();
        return conn;
    }
}

module.exports = DBHelper;

