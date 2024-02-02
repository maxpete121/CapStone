import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/lists',
    name: 'Lists',
    component: loadPage('ListPage'),
    beforeEnter: authGuard
  },
  {
    path: '/viewBuild/:PcId',
    name: 'ViewBuild',
    component: loadPage('ViewBuildPage'),
  },
  {
    path: '/wishlist/:accountId',
    name: 'Saved',
    component: loadPage('SavedPage'),
  },
  {
    path: '/about/:PcId',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: loadPage('CheckoutPage'),
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
