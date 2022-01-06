//sqlMap.js----SQL语句映射文件，以供api逻辑调用

var sqlMap = {
  selectUser: 'SELECT * FROM user WHERE userName = ? AND password = ? ',
  insertUser:'INSERT INTO user (userName,password) VALUES (?,?)',
}
  
module.exports = sqlMap;

