# vue-show
# 安装element-ui,mysql,express,axios依赖
<!--
1.进行登陆页面的布局设置,UI界面分布,初步的跳转功能的实现2021-12-05 23:59:19
2.2022-01-06 23:43:44
重新完善了登陆和注册界面的逻辑操作,跳转功能等的实现.使得登陆逻辑更为清晰.和小程序端口共用一个数据库来注册和登陆.
3. 2022-01-06 23:45:26
带有-pre后缀的为之前只带有登陆验证的后端接口文件.
4.2022-01-07 00:01:46
出现错误:
    [
      throw err; // Rethrow non-MySQL errors
      ^
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client ]
      考虑使用和小程序应用一样,使用PHP后端服务来验证.

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
