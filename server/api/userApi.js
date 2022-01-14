const express = require('express');
const router = express.Router();

const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');

// 增加用户
router.post('/addUser', (req, res) => {
  let sqlStr = sql.user.add;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.userName, params.password], (err, result) => {
    let state = {}
    if (result.length > 0) {
      state.state = 1;
      res.json(state);
    } else {
      state.state = 0;
      res.json(state);
    }
  });
  conn.end();
});
// 验证用户
router.get('/login', (req, res) => {
  // let params = req.body;
  var userName = req.query.userName;
  var password = req.query.password;
  var sqlStr = "select * from user where userName='" + userName + "' and password='" + password + "'";
  var conn = new DBHelper().getConn();

  conn.query(sqlStr, (err, result) => {
    // if (err) {
    //     res.json(err);
    // } else {
    //     res.json(result);
    // }

    let state = {}
    if (result.length != 0) {
      state.state = 1;
      res.json(state);
      // res.json(result)
      // res.send('seccuess')
      res.end()
    } else {
      state.state = 0;
      res.json(state);
      console.log(result)
      // res.json(result)
      // res.end()
    }
  });

});
// 查询用户
 router.get('/list', (req, res) => {
    let sqlStr = sql.user.list;
    // let params = req.body;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr,(err, result) => {
        if (err) {
            res.json(err);
            // res.end()
        } else {
            console.log(result);
            res.json(result)
            // res.end()
            // console.log(result)
        }
    });
   
}); 
// 查询环境数据
router.get('/list2', (req, res) => {
  let sqlStr = sql.user.list2;
  // let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr,(err, result) => {
      if (err) {
          res.json(err);
          // res.end()
      } else {
          console.log(result);
          res.json(result)
          // res.end()
          // console.log(result)
      }
  });
 
}); 
/* 
router.get('/list', (req, res) => {
  let conn = new DBHelper().getConn();
  var sql = 'SELECT * FROM user';
  conn.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }

    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
  });

  connection.end();

});
 */




module.exports = router;
