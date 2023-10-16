import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
/*
  1、核心所在。使得页面跳转和管理员权限得以实现。
  2、可生成不同的侧边栏。管理员默认账号为admin


*/

// export default new Router({
//   routes: defaultRouter
// })
// export {defaultRouter, adminRouter}

export default new Router({
  mode: 'history',
  // history模式并且放在cherish目录下,如果为hash模式,且放在根目录下,不用改
  // base: '/cherish/',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/monitor',
      component: (resolve) => require(['../components/common/Home.vue'], resolve),

      children: [
        {
          //此处将readme改为monitor监控界面
          // path: '/',
          // component: resolve => require(['../components/page/Readme.vue'], resolve)
          path: '/',
          component: (resolve) => require(['../components/page/Monitor.vue'], resolve),
        },
        {
          path: '/upload',
          component: (resolve) => require(['../components/page/Upload.vue'], resolve), // Vue-Core-Image-Upload组件
        },
        {
          path: '/monitor2',
          component: (resolve) => require(['../components/page/Monitor2.vue'], resolve), // Vue-Core-Image-Upload组件
        },
        {
          path: '/test',
          component: (resolve) => require(['../components/page/test.vue'], resolve), // Vue-Core-Image-Upload组件
        },
        {
          path: '/userCenter',
          component: (resolve) => require(['../components/page/UserCenter.vue'], resolve), // 拖拽列表组件
        },
        {
          path: '/modifyUser',
          component: (resolve) => require(['../components/page/ModifyUser.vue'], resolve),
        },
        {
          path: '/modifyPassword',
          component: (resolve) => require(['../components/page/ModifyPassword.vue'], resolve),
        },
        //控制页面
        {
          path: '/control',
          component: (resolve) => require(['../components/page/Control.vue'], resolve),
        },
        //数据监控页面

        //数据库显示界面
        {
          path: '/db',
          component: (resolve) => require(['../components/page/Db.vue'], resolve),
          isAutht: true,
        },
        {
          path: '/db2',
          component: (resolve) => require(['../components/page/Db2.vue'], resolve),
        },
      ],
    },
    {
      path: '/register',
      component: (resolve) => require(['../components/page/Register.vue'], resolve),
    },

    {
      path: '/login',
      component: (resolve) => require(['../components/page/Login.vue'], resolve),
    },
  ],
});
