// sql语句
var sqlMap = {
  user: {
    // 添加用户
    add: 'insert into user(userName, password) values (?, ?)',
    // 查询用户
    list: 'select * from user ',
     // 查询环境数据
     list2: 'select * from data ',
    
    valid: 'select * from user where userName = ? and password = ? ',
  }
};

module.exports = sqlMap;
