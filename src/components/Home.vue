<template>
  <div id="home">
  
    <div class="slider">
      <a :href="banner.link" :target="(banner.blank ? '_blank' : '')" v-for="(banner, index) in banners.top" v-bind:key="index">
        <img :src="banner.image" />
      </a>
    </div>
    
    <div id="content" class="container">
    
      <aside>
      
        <ul>
          <li>
            <h2>Categorías</h2>
            <ul>
              <li v-for="(category, index) in categories" v-bind:key="index">
                <router-link :to="category.url">{{category.name}}</router-link>
              </li>
            </ul>
          </li>
          <li class="views">
            <h2>Vistas</h2>
            <a href="" class="view grid active">Grilla</a>
            <a href="" class="view list">Lista</a>
          </li>
        </ul>
      
      </aside>
    
    <div class="content">
    
      <div class="banners">
        <a :href="banner.link" :target="(banner.blank ? '_blank' : '')" v-for="(banner, index) in banners.bottom" v-bind:key="index">
          <img :src="banner.image" />
        </a>
      </div>
    
      <h2>Productos <strong>destacados</strong></h2>
      <ProductList :home="true" :limit="8"></ProductList>
    
    </div>
  
  </div>
  
  </div>
</template>

<script>
import banner from '../ventaspop/Banner';
import ProductList from './ProductList.vue';

export default {
  name: 'Home',
  components: {
    ProductList,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    banners: { top: [], bottom: [] },
  }),
  created() {
    banner.get('home-carrousel-desktop').then((banners) => { this.banners.top = banners.data; });
    banner.get('home-1st-row').then((banners) => { this.banners.bottom = banners.data; });
  },
};
</script>
