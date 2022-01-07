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
      if(result.length > 0) {
        state.state = 1;
        res.json(state);
      } else {
        state.state = 0;
        res.json(state);
      }
    });
    // conn.end();
});
// 验证用户
router.get('/login', (req, res) => {
    
    // let params = req.body;
    var userName = req.query.userName;
    var password = req.query.password;
    var sqlStr =  "select * from user where userName='"+userName+"' and password='"+password+"'";
    var conn = new DBHelper().getConn();
    
    conn.query(sqlStr, (err, result) => {
        // if (err) {
        //     res.json(err);
        // } else {
        //     res.json(result);
        // }
       
        let state={}
        if(result.length != 0) {
          state.state = 1;
          res.json(state);
          // res.json(result)
          // res.send('seccuess')
          res.end()
        } else {
          state.state = 0;
          res.json(state);
          // res.json(result)
          // res.end()
        }
    });
   
});
// 查询用户
router.post('/selectUser', (req, res) => {
    let sqlStr = sql.user.select;
    let params = req.body;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.name], (err, result) => {
        if (err) {
            res.json(err);
            res.end()
        } else {
            console.log(result);
            res.json(result)
            res.end()
        }
    });
   
});



module.exports = router;
