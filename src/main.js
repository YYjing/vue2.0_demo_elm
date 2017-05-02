// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import goods from 'components/goods/goods'; // 在webpack的base设置中设置了路径别名
import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';
import VueResource from 'vue-resource';
import 'common/css/index.css';
import 'common/css/style.css';
import 'common/stylus/index.styl';
// import 'common/js/config'

Vue.use(VueResource);
Vue.use(VueRouter);

/* eslint-disable no-new */
// let app = Vue.extend(App);
// 定义路由
const routes = [
  // { path: '/*', components: goods },
   { path: '/goods', component: goods, name: 'goods' },
  { path: '/ratings', component: ratings, name: 'ratings' },
  { path: '/seller', component: seller, name: 'seller' },
  {path: '/', redirect: { name: 'goods' }}
];

const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active' // http://router.vuejs.org/zh-cn/api/router-link.html
});

new Vue({
  router: router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
