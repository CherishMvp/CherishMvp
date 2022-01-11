import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/monitor',
      component: resolve => require(['../components/common/Home.vue'], resolve),

      children: [
        {
          //此处将readme改为monitor监控界面
          // path: '/',
          // component: resolve => require(['../components/page/Readme.vue'], resolve)
          path: '/',
          component: resolve => require(['../components/page/Monitor.vue'], resolve)

        },
        {
          path: '/upload',
          component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
        },
        {
          path: '/userCenter',
          component: resolve => require(['../components/page/UserCenter.vue'], resolve)    // 拖拽列表组件 
        },
        {
          path: '/modifyUser',
          component: resolve => require(['../components/page/ModifyUser.vue'], resolve)
        },
        {
          path: '/modifyPassword',
          component: resolve => require(['../components/page/ModifyPassword.vue'], resolve)
        },
        //控制页面
        {
          path: '/control',
          component: resolve => require(['../components/page/Control.vue'], resolve)
        },
        //数据监控页面
        {
          path: '/show',
          component: resolve => require(['../components/page/Show.vue'], resolve)
        },
              //数据库显示界面
              {
                path: '/db',
                component: resolve => require(['../components/page/Db.vue'], resolve)
              },
        {
          path: '/success',
          component: resolve => require(['../components/page/Success.vue'], resolve)
        }
      ]
    },
    {
      path: '/register',
      component: resolve => require(['../components/page/Register.vue'], resolve)
    },
    {
      path: '/register-success',
      component: resolve => require(['../components/page/RegisterSuccess.vue'], resolve)
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
  ]
})
