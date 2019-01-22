import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./components/Home.vue'),
    },
    {
      path: '/catalogo/:id-*',
      name: 'Category',
      component: () => import('./components/Category.vue'),
    },
    {
      path: '/paginas/:id-*',
      name: 'Page',
      component: () => import('./components/Page.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/Login.vue'),
    },
    {
      path: '/registro',
      name: 'Register',
      component: () => import('./components/Register.vue'),
    },
  ],
});
