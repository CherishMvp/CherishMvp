//测试用api示例

const mysql = require('mysql');//导入mysql
const dbConfig = require('./db');//mysql配置
const sqlMap = require('./sqlMap');//映射语句
const router = express.Router();//路由
 
const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true    // 多语句查询
});
// 增加用户接口
router.get('/addUser', (req, res) => {
  let userName = req.body.name;
    let password = req.body.pass;
 
  pool.getConnection((err,connection) => {
    var sql = sqlMap.insertUser;
    connection.query(sql, [userName, password], (err,result) => {
        // res.json(result);    // 向前端返回json格式的数据
        connection.release();
        let state = {}
        if(result.length > 0) {
          state.state = 1;
          res.json(state);
        } else {
          state.state = 0;
          res.json(state);
        }
    })
})
  
});
//查找用户接口
router.post('/login', (req, res) => {
  let userName = req.query.userName;
    let password = req.query.password;
    pool.getConnection((err,connection) => {
        var sql = sqlMap.selectUser;
        connection.query(sql, [userName, password], (err,result) => {
            // res.json(result);    // 向前端返回json格式的数据
            connection.release();
            let state = {}
            if(result.length > 0) {
              state.state = 1;
              res.json(state);
            } else {
              state.state = 0;
              res.json(state);
            }
        })
    })
});


module.exports = router;

