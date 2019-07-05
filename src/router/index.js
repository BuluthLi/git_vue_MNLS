import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/index/Index'
// import Main from '@/components/main/Main'
// import SaleList from '@/components/salelist/SaleList'
// import SaleDetail from '@/components/saledetail/SaleDetail'
// import ProjectList from '@/components/projectlist/ProjectList'
// import ProjectDetail from '@/components/projectdetail/ProjectDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/mnls/',
  routes: [
    {
      path: '/',
      name: 'Index',
      // component: (resolve) => require(['../components/index/Index.vue'], resolve)
      component:()=>import(/*webpackChunkName:'home' */'../components/index/Index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/main',
      name: 'Main',
      component:()=>import(/*webpackChunkName:'main' */'../components/main/Main.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/main/salelist',
      name: 'SaleList',
      component: (resolve) => require(['../components/salelist/SaleList.vue'], resolve),
    },
    {
      path: '/main/salelist/saledetail',
      name: 'SaleDetail',
      component: (resolve) => require(['../components/saledetail/SaleDetail.vue'], resolve),
    },
    {
      path: '/projectlist',
      name: 'ProjectList',
      component: (resolve) => require(['../components/projectlist/ProjectList.vue'], resolve),
    },
    {
      path: '/projectlist/projectdetail',
      name: 'ProjectDetail',
      component: (resolve) => require(['../components/projectdetail/ProjectDetail.vue'], resolve),
    }
  ]
})
