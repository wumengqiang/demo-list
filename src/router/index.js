import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () => System.import('../views/CreateListView').then(m => m.default(id))
const DemoList = () => () => System.import('../views/DemoList').then(m => m.default())
const ItemView = () => System.import('../views/ItemView.vue')
const itemList = () => System.import('../views/ItemList.vue')
// const DemoList = () => System.import('../views/DemoList');

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', redirect: '/demos/' },
      { path: "/demos/:page(\\d+)?", component: itemList},
      { path: "/demos/tags/:tag([^\\/]+)/:page(\\d+)?", component: itemList},
    ]
  })
}
