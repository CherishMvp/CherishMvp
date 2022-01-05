import Vue from 'vue'
import Router from 'vue-router'


import Login from '../components/login'
import Home from '../components/home'
import Monitor from '../components/Monitor'
import About from '../components/About'
import Test from '../components/Test';

/* Layout */
// import Layout from '@/layout'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
			path:'/about',
			component:About,
      name:'about'
		},
		{
			path:'/test',
			component:Test,
      name:'test'
		}
    ,{
      path: '/',
      name: 'login',
      component: Login,
      components:{
        default:Login,
        test:Test,
        about:About
      }
      // path: '/',
      // component: Layout,
      // redirect: '/dashboard',
      // children: [{
      //   path: 'dashboard',
      //   name: 'Dashboard',
      //   component: () => import('@/views/dashboard/index'),
      //   meta: { title: 'Dashboard', icon: 'dashboard' }
      // }]
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: Monitor
    }
  
  ]
})
