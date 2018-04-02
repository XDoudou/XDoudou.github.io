import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods/goods'
import seller from '../components/seller/seller'
import ratings from '../components/ratings/ratings'


Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/goods'
  }, 
  {
    path: '/goods',
    component: goods
  },
  {
    path: '/ratings',
    component: ratings
  },
  {
    path: '/seller',
    component: seller
  },
];

export default new Router({
  linkActiveClass: 'active',
  routes
})
/* 
import Vue from 'vue';
import Router from 'vue-router';
;
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

Vue.use(Router);

const routes = [{
  path: '/',
  redirect: '/goods'
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}, {
  path: '/seller',
  component: seller
}];

export default new Router({
    linkActiveClass: 'active',
    routes
}); */

