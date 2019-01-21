<template>
  <div id="app">
    <heading :shop="shop" :categories="categories" :user="user" />
    <main id="main">
      <router-view :user="user" :categories="categories" />
    </main>
    <foot :shop="shop" :pages="pages" />
  </div>
</template>

<style lang="scss">
@import './assets/css/global.scss';
</style>

<script>
import user from './ventaspop/User';
import configuration from './ventaspop/Configuration';
import page from './ventaspop/Page';
import category from './ventaspop/Category';
import heading from './components/Header.vue';
import foot from './components/Footer.vue';

export default {
  name: 'app',
  components: {
    heading,
    foot,
  },
  data() {
    return {
      shop: {},
      pages: [],
      categories: [],
      user: {},
    };
  },
  created() {
    configuration.get().then((shop) => { this.shop = shop.data; });
    page.get().then((pages) => { this.pages = pages.data.slice(0, 2); });
    category.get().then((categories) => { this.categories = categories.data; });
    this.user = user;
    this.user.init();
  },
};
</script>
