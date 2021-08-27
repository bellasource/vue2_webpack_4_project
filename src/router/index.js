import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "route-root" */ '@src/views/home'),
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('@src/views/home'),
    },
    {
      name: '404',
      path: '/404',
      component: () => import('@src/views/404'),
    },
    {
      path: '*', // 此处需特别注意至于最底部
      redirect: '/404',
    },
  ],
});
