// express框架编写各类接口。
// 包括登录注册、用户查询、历史数据查询、删除户、修改密码等

const express = require('express');
const router = express.Router();
const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');
const { connect } = require('echarts');


// 响应一个JSON数据（未用到）
var jsonWrite = function (res, ret)
{
  if (typeof ret === 'undefined') {
    res.json({
      code: '1', msg: '操作失败'
    });
  }
  else {
    res.json(
      ret
    );
  }
};



// 增加用户
router.post('/addUser1', (req, res) =>
{
  let sqlStr = sql.user.add;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.userName, params.password, params.phone], (err, result) =>
  {
    // let state = {}
    // if (result.length > 0) {
    //   state.state = 1;
    //   res.json(state);
    // } else {
    //   state.state = 0;
    //   res.json(state);
    // }
    // });
    // conn.end();
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      console.log('suc')
    }
  })
});


// 修改用户接口
router.post('/updateUser3', (req, res) =>
{
  var params = req.body;
  let conn = new DBHelper().getConn();
  var sql = " update user set password = '" + params.password + "' where userName = '" + params.userName + "'";
  console.log(params);
  conn.query(sql, [params.userName], function (err, result)
  {
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log(res);
      jsonWrite(res, result);
    }
  })
});

// 删除用户接口
router.post('/del', (req, res) =>
{
  let sqlStr = sql.user.del;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.id], (err, result) =>
  {
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
// 更新用户信息
router.post('/updateUser', (req, res) =>
{
  let sqlStr = sql.user.update;
  let params = req.body;
  let conn = new DBHelper().getConn();
  // 传进来的参数要和前端写的一样顺序。
  conn.query(sqlStr, [params.pass, params.name], (err, result) =>
  {
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
// 修改用户信息
// 更新用户信息，修改用户信息
router.post('/up', (req, res) =>
{
  let sqlStr = sql.user.update2;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.password, params.tel, params.userName,], (err, result) =>
  {
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

// 验证用户名和密码
router.post('/login', (req, res) =>
{
  let params = req.body;
  console.log('body', params);
  // 定义查询的信息为前端请求带过来的参数。
  // var userName = params.params.userName;
  // var password = params.params.password;
  const { userName, password } = req.body
  var sqlStr = "select * from user where userName='" + userName + "' and password='" + password + "'";
  var conn = new DBHelper().getConn();
  // 2022-09-27 20:04:49
  // 解构赋值，直接拿到验证的账号密码,res.json的理解，返回对应的状态码来判断
  conn.query(sqlStr, (err, result) =>
  {
    console.log('result: ' + JSON.stringify(result));
    if (!err) {
      if (result.length != 0) {
        res.json({
          message: '登录成功',
          code: 200
        })
      } else {
        res.json({
          message: '账号或密码错误',
          code: 400
        })
      }
    } else {
      res.json({
        message: err,
        code: 500
      })
    }
  });

});
// 验证用户名
router.get('/loginUser', (req, res) =>
{
  // let params = req.body;
  var userName = req.query.userName;
  // var password = req.query.password;
  var sqlStr = sql.user.valid2
  // var sqlStr = "select * from user where userName='" + userName + "' ";
  var conn = new DBHelper().getConn();

  conn.query(sqlStr, (err, result) =>
  {
    let state = {}
    if (result.length != 0) {
      state.state = 1;
      res.json(state);
      res.end()
    } else {
      state.state = 0;
      res.json(state);
      console.log(result)
    }
  });

});
// 验证用户名,通过查询数据库，将本地的和数据库对比。从而判断

router.get('/list3', (req, res) =>
{
  let sqlStr = sql.user.list;
  // let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, (err, result) =>
  {
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

// 查询用户
router.get('/list', (req, res) =>
{
  let sqlStr = sql.user.list;
  // let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, (err, result) =>
  {
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
router.get('/list2', (req, res) =>
{
  let sqlStr = sql.user.list2;
  // let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, (err, result) =>
  {
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
// // 用户注册
// router.get('/reg',function (req, res, next) {
//   // 从连接池获取连接
//   let conn = new DBHelper().getConn();
//   conn(function (err, connection) {
//       // 获取前台页面传过来的参数
//       var param = req.query || req.params;
//       var userName = param.userName;
//       var password = param.password;
//       var _res = res;
//       connection.query(sql.list, function (err, res) {
//           var isTrue = false;
//           if(res){ //获取用户列表，循环遍历判断当前用户是否存在
//               for (var i=0;i<res.length;i++) {
//                   if(res[i].uid == userName && res[i].userName == password) {
//                       isTrue = true;
//                   }
//               }
//           }
//           var data = {};
//           data.isreg = !isTrue; //如果isTrue布尔值为true则登陆成功 有false则失败
//           if(isTrue) {
//               data.result = {
//                   code: 1,
//                   msg: '用户已存在'
//               };//登录成功返回用户信息
//           } else {
//               connection.query(userSQL.insert, [param.uid,param.name], function (err, result) {
//                   if(result) {
//                       data.result = {
//                           code: 200,
//                           msg: '注册成功'
//                       };
//                   } else {
//                       data.result = {
//                           code: -1,
//                           msg: '注册失败'
//                       };
//                   }
//               });
//           }

//           if(err) data.err = err;
//           // 以json形式，把操作结果返回给前台页面
//           setTimeout(function () {
//               responseJSON(_res, data)
//           },300);
//           // responseJSON(_res, data);
//           // 释放链接
//           connection.release();

//       });
//   });
// });



module.exports = router;
