// express框架编写各类接口。
// 包括登录注册、用户查询、历史数据查询、删除户、修改密码等

const express = require('express');
const router = express.Router();
const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');
const { connect } = require('echarts');

// 响应一个JSON数据（未用到）
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败',
    });
  } else {
    res.json(ret);
  }
};

// 增加用户
router.post('/user/addUser', (req, res) => {
  let sqlStr = sql.user.add;
  let conn = new DBHelper().getConn();
  const { userName, password, phone } = req.body;
  conn.query(sqlStr, [userName, password, phone], (err, result) => {
    if (!err) {
      if (result.length != 0) {
        res.json({
          message: '增加成功',
          code: 200,
        });
      } else {
        res.json({
          message: '增加失败',
          code: 400,
        });
      }
    } else {
      res.json({
        message: err,
        code: 500,
      });
    }
  });
});

// 删除用户接口
router.post('/user/del', (req, res) => {
  let sqlStr = sql.user.del;
  let conn = new DBHelper().getConn();
  const { bookid } = req.body;
  console.log('id', bookid);
  conn.query(sqlStr, [bookid], (err, result) => {
    if (!err) {
      if (result.length != 0) {
        res.json({
          message: '删除成功',
          code: 200,
        });
      } else {
        res.json({
          message: '删除失败',
          code: 400,
        });
      }
    } else {
      res.json({
        message: err,
        code: 500,
      });
    }
  });

  conn.end();
});
// 修改用户密码
router.post('/user/updatePwd', (req, res) => {
  let sqlStr = sql.user.update;
  console.log('req', req.body);
  const { pass, name } = req.body;
  let conn = new DBHelper().getConn();
  // 传进来的参数要和前端写的一样顺序。
  conn.query(sqlStr, [pass, name], (err, result) => {
    if (!err) {
      if (result.length != 0) {
        res.json({
          message: '修改成功',
          code: 200,
        });
      } else {
        res.json({
          message: '修改失败',
          code: 400,
        });
      }
    } else {
      res.json({
        message: err,
        code: 500,
      });
    }
  });
  conn.end();
});
// 修改用户信息
// 更新用户信息，修改用户信息
router.post('/user/updateUser', (req, res) => {
  let sqlStr = sql.user.update2;
  let params = req.body;
  let conn = new DBHelper().getConn();
  const { password, tel, userName } = req.body;
  conn.query(sqlStr, [password, tel, userName], (err, result) => {
    if (!err) {
      if (result.length != 0) {
        res.json({
          message: '修改成功',
          code: 200,
        });
      } else {
        res.json({
          message: '修改失败',
          code: 400,
        });
      }
    } else {
      res.json({
        message: err,
        code: 500,
      });
    }
  });
  conn.end();
});

// 验证用户名和密码
router.post('/user/login', (req, res) => {
  // let params = req.body;
  // console.log('body', params);
  // 定义查询的信息为前端请求带过来的参数。
  // var userName = params.params.userName;
  // var password = params.params.password;
  console.log('req.body', req.body);
  const { userName, password } = req.body;
  var sqlStr = "select * from user where userName='" + userName + "' and password='" + password + "'";
  var conn = new DBHelper().getConn();
  // 2022-09-27 20:04:49
  // 解构赋值，直接拿到验证的账号密码,res.json的理解，返回对应的状态码来判断
  conn.query(sqlStr, (err, result) => {
    // console.log('result: ' + JSON.stringify(result));
    if (!err) {
      if (result.length != 0) {
        res.json({
          message: '登录成功',
          code: 200,
        });
      } else {
        res.json({
          message: '账号或密码错误',
          code: 400,
        });
      }
    } else {
      res.json({
        message: err,
        code: 500,
      });
    }
  });
});
// 验证用户名,通过查询数据库，将本地的和数据库对比。从而判断是否重复用户
router.get('/user/register', (req, res) => {
  let sqlStr = sql.user.list;
  // let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
// 查询用户
router.get('/user/list', (req, res) => {
  let sqlStr = sql.user.list;
  // let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      // 直接返回数据，页面通过res.data接收
      // console.log(result);
      res.json(result);
    }
  });
});

// 查询环境数据
router.get('/user/list2', (req, res) => {
  let sqlStr = sql.user.list2;
  // let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
// 验证是否重复用户，或者插入是否成功，可以交给前端处理
/*
// 
// router.get('/user/reg',function (req, res, next) {
//   let conn = new DBHelper().getConn();
//   conn(function (err, connection) {
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


*/
