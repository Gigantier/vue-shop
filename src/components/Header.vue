<template>
  <header id="header">
    <div class="container">
      <span class="toggle"><span>Menú</span></span>
      <ul class="menu">
        <li><span class="toggle"></span></li>
        <li>
          <a href="" class="expand">mi cuenta</a>
          <ul>
            <li><a href="micuenta">Mis datos</a></li>
            <li><a href="pedidos">Historial de pedidos</a></li>
            <li><a href="mensajes">Mensajes</a></li>
            <li><a href="logout">Salir</a></li>
          </ul>
        </li>
        <li><router-link to="login">login</router-link></li>
        <li><router-link to="registro">regístrate</router-link></li>
      </ul>

      <p class="logo"><router-link to="/"><img :src="shop.LOGO" alt="" /></router-link></p>

      <form action="buscar" method="get" class="search">
        <input type="search" placeholder="Buscar..." name="query" value="" />
      </form>

      <nav>
        <ul>
          <li>
            <a href="" class="expand">categorías</a>
            <ul class="drop">
              <li v-for="(cat, index) in categories" v-bind:key="index">
                <router-link :to="cat.url">{{cat.name}}</router-link>
              </li>
            </ul>
          </li>
          <li class="user" v-if="user.logged">
            <a href="micuenta">Hola <strong>{{user.name}}</strong></a>
            <ul class="drop">
              <li><a href="micuenta">Mis datos</a></li>
              <li><a href="pedidos">Historial de pedidos</a></li>
              <li><a href="mensajes">Mensajes</a></li>
            </ul>
          </li>
          <li v-if="user.logged"><a class="logout" href="#" @click.prevent="logout"><img src="../assets/images/logout.svg" alt="logout" /></a></li>
          <li v-if="!user.logged">
            <a href="login">login</a>
            <form method="post" class="drop login" @submit.prevent="login">
              <h2>Ingresa tu cuenta</h2>
              <input type="email" name="email" placeholder="email" v-model="email" required />
              <input type="password" name="pwd" placeholder="contraseña" v-model="pwd" required />
              <button type="submit" name="login" value="1" class="btn">Ingresar</button>
              <p>¿no tienes cuenta? <a href="registro">regístrate aquí</a></p>
            </form>
          </li>
          <li v-if="!user.logged"><a href="registro">regístrate</a></li>
          <li class="cart">
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    shop: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    email: null,
    pwd: null,
  }),
  methods: {
    login() {
      this.user.login(this.email, this.pwd);
    },
    logout() {
      this.user.logout();
    },
  },
};
</script>
