<template>
  <ul class="listing">
    <li v-for="(product, index) in products" v-bind:key="index" class="analyticsProduct" :class="{ agotado: !product.stock }" :data-id="product.id" itemscope itemtype="http://schema.org/Product" :data-manufacturer="product.manufacturer">
      <form method="post">
        <router-link :to="product.url">
          <div class="image">
            <div class="discount" v-if="product.discount"><span><big>{{product.discount}}%</big>OFF</span></div>
            <img :src="product.thumbnails.x300" alt="">
          </div>
          
          <div class="info">
            <span class="fav toggleFav"></span>
            <h2>{{product.name}}</h2>
            <p class="price"><span>{{price(product.price)}}</span></p>
            
            <p class="extra truck" v-if="product.freeShipping">
              <object type="image/svg+xml" data="/assets/images/truck.svg"></object>
              Envío gratis
            </p>
            
            <p class="extra card" v-if="product.installments">
              <object type="image/svg+xml" data="/assets/images/card.svg"></object>
              Hasta {{product.installments}} cuotas sin interés
            </p>
          </div>
          
          <div class="button">
            <button class="btn" type="submit">Agregar al carrito</button>
          </div>
        </router-link>
      </form>
    </li>
  </ul>
</template>

<script>
import product from '../ventaspop/Product';
import GigantierShop from '../gigantierShop';

export default {
  name: 'ProductList',
  mixins: [GigantierShop],
  props: {
    home: {
      type: Boolean,
      required: false,
    },
    limit: {
      type: Number,
      required: false,
    },
  },
  data: () => ({
    products: [],
  }),
  created() {
    product.get(this.$props).then((products) => { this.products = products.data; });
  },
};
</script>
