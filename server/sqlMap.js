// sql语句
var sqlMap = {
  user: {
    // 添加用户
    add: 'insert into user(userName, password) values (?, ?)',
    // 查询用户
    select: 'select * from user where userName like "%"?"%"',
    valid: 'select * from user where userName = ? and password = ? ',
  }
};

module.exports = sqlMap;
