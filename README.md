# vue-show
# 安装element-ui,mysql,express,axios依赖
<!--
1.  2021-12-05 23:59:19
  进行登陆页面的布局设置,UI界面分布,初步的跳转功能的实现
2.  2022-01-06 23:43:44
  重新完善了登陆和注册界面的逻辑操作,跳转功能等的实现.使得登陆逻辑更为清晰.和小程序端口共用一个数据库来注册和登陆.
3.  2022-01-06 23:45:26
  带有-pre后缀的为之前只带有登陆验证的后端接口文件.
4.  2022-01-07 00:01:46
  出现错误:
    [
      throw err; // Rethrow non-MySQL errors
      ^
  Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after   they are sent to the client 
  ]
      考虑使用和小程序应用一样,使用PHP后端服务来验证.
5.  2022-01-07 09:20:54
  这种问题的出现是由于，node每次只能返回一次res.send()，如果返回多次就会报这样的错。
6.  2022-01-07 10:27:16
  完善验证码逻辑登录.
  并且通过sessionStorage.setItem('ms_username', this.ruleForm.userName)
7.  2022-01-07 20:09:56
  1.npm run build 后,上传至云服务器,静态资源不显示问题,
  见CSDN链接:https://i.csdn.net/#/user-center/collection-list?type=1&folder=12302505&key=4
  2.路由跳转模式还是hash模式,不是history.
  3. 步骤: 设置好各个路径后,你npm run build -- 将dist文件夹放在 dist的dist里面--配置nginx代理,设置接口如 api/user{ }要一一对应 --》通过pm2 来管理node服务
8.  2022-01-07 21:20:09
  1.注册界面还需美化完善.
  2.其他监控、反向控制界面还需要完善.()不能只盯着美化界面去做,功能应该先实现.美化后期可以再做.
9.  2022-01-11 14:23:32
  1.nginx服务器偶现崩溃的迹象,目前只能通过重装宝塔nginx的方式来解决此问题.
  2.若将小程序的数据库php文件放在云服务器上,当nginx服务器发生问题的时候会使用不了登陆和注册的验证.
  3.解决方式:(重新补习nginx的知识,当再次遇到突发问题的时候即使解决.)
10. 2022-01-11 15:00:24
  1.初步完善侧边栏和各子菜单,建议十五号之前完成硬件模块的选择使用和页面的传值.
11. 2022-01-13 08:41:03
  1.加入读取数据库内容的表格,方便数据查看.
  2.同理得到一个用户数据库和环境数据库的显示.但对于封装好的表格属性,如page-current等方法还有待完善.如 分页显示,查询等.
12. 2022-01-13 10:50:41
  1.同时还修改了 config里面的index的属性
  [
    assetsPublicPath: '/',//打包的时候变成’./‘
    ]
    在打包的时候记得改回去‘./’
    因为在本地设置成‘./’会显示空白,所以在本地的时候就为‘/’
13. 2022-01-14 09:35:00
  1.对于环境数据的数据库,必须采用分页查询的方式,否则一次性请求千条的数据会过多.
  2.  2022-01-14 11:06:24
    目前在control.vue中编写了分页test,可对,mysql表中的小部分数据进行分页查询.
    但还未解决axios按需请求数据库的操作.即,目前只是先对数据库的数据一次性全部获取,然后再进行数据的分页.
    而最终要实现的是页面按需从数据库中获取数据,因为若一次性向服务器请求全部的数据,数据量太大会对服务器造成阻塞,即 用到哪里,就请求到哪里.
  3. 2022-01-14 11:22:22
    考虑减少样本容量,此前环境数据库已采集近万条数据,可适当减少,从而降低阻塞可能.对数据库定时备份和清除冗余数据.
  4. 2022-01-14 14:06:49
    结合此前的mpvue小程序switch设置,初步实现开关主题的发送.进一步的逻辑状态还需重新设计
  5. 2022-01-14 23:45:36
    在发送命令的Demo中,即Control.vue中,对name的一和name的二进行了beep和led的test操作
  6. 2022-01-15 14:34:23
    加入title-img,测试控制功能
14. 2022-01-16 08:55:54
  1.修改mqtt客户端的clientId, 避免重连.如 微信小程序为wx_开头,Control.vue为control_开头,monitor为monitor_开头.
  2. 2022-01-16 10:30:14
  考虑简化反向控制功能的逻辑,即在小程序中,不再纠结开关是否是双向绑定.
  统一在用户端发送控制指令,实现设备的开关,并且将控制指令封装在一个mqtt主题中(zwt/test/state).
  而客户端仅仅只作为环境数据的发送端,和接受用户发来的另外一个主题作为控制信息.
15. 2022-01-17 10:01:35
  1.暂停前端显示界面的相关操作,如数据库中环境数据的显示和其余数据的实时监控功能暂不深入完善.
  2.先将硬件设备完善,对最后的数据采集和传感器等选用出结果.功能实现就行,无需太过于强求.
  3.git操作备注:
    [ 
      1.查看分支: git branch -a 
      2.创建分支:  git branch name
      3.转移到要上传的分支下:git checkout name
      4.git push origin name
    ]
 -->
> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
