import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import kaoshi from '@/components/kaoshi'
import sosuo from '@/components/sosuo'
import Rand from '@/pages/rand'
import Mi  from '@/pages/mi/home'
import Cart from '@/pages/mi/cart';
import admins from './admin';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/kaoshi',
      name: 'kaoshi',
      component: kaoshi
    },
    {
      path: '/sosuo',
      name: 'sosuo',
      component: sosuo
    },
    {
      path: "/rand",
      component: Rand
    },
    {
      path: "/mi/home",
      component:Mi
    },{
      path: "/mi/cart",
      component: Cart,
    },
    ...admins
  ]
})
