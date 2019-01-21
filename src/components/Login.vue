<template>
  <div id="register" class="container xsmall">
  
    <h1>Ingresa a tu cuenta</h1>
    
    <form method="post" class="account" @submit.prevent="login">
      <div class="row">
        <div class="field">
          <label>
            E-mail
            <input type="email" name="email" required="required" v-model="email" />
          </label>
        </div>
        <div class="field">
         <label>
           Contraseña
           <input type="password" name="pwd" required="required" v-model="pwd" />
          </label>
        </div>
      </div>
      
      <p class="tos">¿No tienes cuenta? <router-link to="registro">Regístrate</router-link></p>
      
      <input type="submit" name="login" value="Ingresar" class="button btn btn-primary" />
    </form>
    
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
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
      this.user.login(this.email, this.pwd).then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>
