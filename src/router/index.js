import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/index/Index'
import Main from '@/components/main/Main'
// import SaleList from '@/components/salelist/SaleList'
// import SaleDetail from '@/components/saledetail/SaleDetail'
// import ProjectList from '@/components/projectlist/ProjectList'
// import ProjectDetail from '@/components/projectdetail/ProjectDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/mnls/',
  // base: 'mnls',//莫得区别，推荐第一种
  routes: [
    {
      path: '/',
      name: 'Index',
      // component: (resolve) => require(['../components/index/Index.vue'], resolve)
      component: () => import(/*webpackChunkName:'home' */'../components/index/Index.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import(/*webpackChunkName:'main' */'../components/main/Main.vue'),
      // component:Main,
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
// 路由懒加载：https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
// 一级路由页面异步加载（webpack4.0）
// Vue.use(Router);
// import Vue from 'vue';
// import Router from 'vue-router';
// export default new Router({
// routes: [{
//     path: '/a',
//     component: () =>
//         import ( /* webpackChunkName: 'a' */ '@/pages/a'),
//     name: 'a'
// }, {
//     path: '/b',
//     component: () => import ( /* webpackChunkName: 'b' */ '@/pages/b'),
//     name: 'b',
//     children: [{
//             path: 'b/m',
//             component: require('@/pages/b/m').default,
//             name: 'm',
//             children: [{
//                 path: 'b/m/p',
//                 component: require('@/pages/b/m/p').default,
//                 name: 'p'
//             }, {
//                 path: 'b/m/q',
//                 component: require('@/pages/b/m/q').default,
//                 name: 'q'
//             },
//         ]
//     }]
// }]
