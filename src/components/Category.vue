<template>
  <div id="listing">
  
    <div id="content" class="container">
    
      <aside>
      
        <ul>
          <li>
            <h2>Categorías</h2>
            <ul>
              <li v-for="(cat, index) in categories" v-bind:key="index" :class="{ active: (category.id == cat.id) }">
                <router-link :to="cat.url">{{cat.name}}</router-link>
              </li>
            </ul>
          </li>
          <li>
            <h2>Ordenar por</h2>
            <ul>
              <li :class="{ active: (sort == 'price') }"><a href="#" @click.prevent="sort = 'price'">menor precio</a></li>
              <li :class="{ active: (sort == 'created') }"><a href="#" @click.prevent="sort = 'created'">novedades</a></li>
              <li :class="{ active: (sort == 'discount') }"><a href="#" @click.prevent="sort = 'discount'">descuento</a></li>
            </ul>
          </li>
          <li v-for="(att, index) in attributes" v-bind:key="index">
            <h2>{{ att.name }}</h2>
            <ul class="collapse" :class="{ color: att.color, size: !att.color }">
              <li v-for="(value, i) in att.values" v-bind:key="i" :class="{ active: (attributes[index].selected && attributes[index].selected.indexOf(value) !== -1) }" v-if="!att.color || att.colors[i]">
                <a href="#" :style="{ backgroundColor: att.colors[i] }" @click.prevent="selectAttribute(index, value)">{{value}}</a>
              </li>
            </ul>
          </li>
          <li class="views">
            <h2>Vistas</h2>
            <a href="#" class="view grid" :class="{ active: !list }" @click.prevent="list = false">Grilla</a>
            <a href="#" class="view list" :class="{ active: list }" @click.prevent="list = true">Lista</a>
          </li>
        </ul>
      
      </aside>
    
      <div class="content">
      
        <div class="banners">
          <a :href="banner.link" :target="(banner.blank ? '_blank' : '')" v-for="(banner, index) in banners.bottom" v-bind:key="index">
            <img :src="banner.image" />
          </a>
        </div>
      
        <h2>{{ category.name }}</h2>
        <ProductList :key="reloadProducts" :categoryId="category.id" :attributes="attributesFilters" :limit="8" :list="list" :sort="sort" v-on:attributesChanged="attributesChanged"></ProductList>
      
      </div>
    
    </div>
    
  </div>
</template>

<script>
import Category from '../ventaspop/Category';
import ProductList from './ProductList.vue';

export default {
  name: 'Category',
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
    list: false,
    category: {},
    sort: 'created',
    attributes: [],
    attributesFilters: {},
    reloadProducts: 0,
  }),
  created() {
    this.load(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.load(to.params.id);
    next();
  },
  methods: {
    load(id) {
      this.category.id = parseInt(id, 10);
      this.attributes = [];
      this.attributesFilters = {};
      Category.getCategory(id).then((c) => { this.category = c.data; });
    },
    attributesChanged(atts) {
      // Keep selected values
      const keys = Object.keys(this.attributes);
      
      for (let i = 0; i < keys.length; i += 1) {
        if (this.attributes[keys[i]].selected) {
          atts[keys[i]].selected = this.attributes[keys[i]].selected;
        }
      }
      
      this.attributes = atts;
    },
    attributeSelected(attId, value) {
      return (this.attributesFilters[attId] && this.attributesFilters[attId].indexOf(value) !== -1);
    },
    selectAttribute(attIndex, value) {
      const attId = this.attributes[attIndex].id;
      let current = this.attributesFilters[attId];
      
      if (this.attributeSelected(attId, value)) {
        // Remove filter
        const where = current.indexOf(value);
        current.splice(where, 1);  
      } else {
        // Add filter
        if (!current) {
          current = [];
        }
        
        current.push(value);
      }
      
      // Force VueJS rendering
      this.$set(this.attributesFilters, attId, current);
      this.$set(this.attributes[attIndex], 'selected', current);
      this.reloadProducts += 1;
    },
  },
};
</script>
