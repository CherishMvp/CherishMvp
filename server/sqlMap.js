// sql语句，在Api中调用
var sqlMap = {
  user: {
    // 添加用户
    // 2022-04-20 20:40:04
    /*
      add增加用户语句，数据库存在就插入，不存在就拒绝插入。
      1、插入一条数据，存在就更新，不存在就更新（必须现有唯一键）可以使用ignore语句；并且将userName属性的索引设置为unique，不重复。
      见CSDN收藏“倒着走的码农”
      *
      */
    add: 'insert ignore into user(userName, password,tel) values (? , ? , ?)',
    // 删除用户
    del: 'delete from user where id = ? ',
    // 查询用户
    valid: 'select * from user where userName = ? and password = ? ',
    valid2: 'select * from user where userName = ? ',

    // 更新用户信息
    update: 'update user set password= ? where userName= ? ',

    /*
	UPDATE test.beyond b
		SET b.args1 = '001', b.args2 = '002'
	WHERE b.args1 = '11' AND b.args2 = '22'
    */
    update2: 'update user set password=?,tel=? where userName=? ',

    // 查询环境数据
    list: 'select * from user ',
    list2: 'select * from data2 ',
  },
};

module.exports = sqlMap;
