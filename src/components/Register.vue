<template>
  <div class="container xsmall" id="register">
    <h1>Crea tu cuenta</h1>
    <form class="account" method="post" @submit.prevent="register">
      <div class="row">
        <div class="field">
          <label>
            Nombre
            <input name="name" required="required" type="text" v-model="name">
          </label>
        </div>
        <div class="field">
          <label>
            Apellido
            <input name="surname" required="required" type="text" v-model="surname">
          </label>
        </div>
      </div>
      <div class="row">
        <div class="field">
          <label>
            E-mail
            <input name="email" required="required" type="email" v-model="email">
          </label>
        </div>
        <div class="field">
          <label for="day">Fecha de nacimiento</label>
          <div class="input date">
            <select v-model="day">
              <option disabled="disabled" selected value="">día</option>
              <option :value="i" v-for="i in 31" v-bind:key="i">{{i}}</option>
            </select>
            <select v-model="month">
              <option disabled="disabled" selected value="">mes</option>
              <option :value="i" v-for="(month, i) in months" v-bind:key="i">{{month}}</option>
            </select>
            <select v-model="year">
              <option disabled="disabled" selected value="">año</option>
              <option :value="i" v-for="i in years" v-bind:key="i">{{i}}</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="field">
          <label>
            Contraseña
            <input name="pwd" required="required" type="password" v-model="pwd">
          </label>
        </div>
        <div class="field">
          <label>
            Confirmar contraseña
            <input name="pwd2" required="required" type="password" v-model="pwd2">
          </label>
        </div>
      </div>
      
      <p><small>* Mínimo 6 caracteres. Para mayor seguridad, le recomendamos utilizar una combinación de letras y números.</small></p>
      <label class="tos">
        <input name="tos" required="required" type="checkbox" value="1">
        He leído y aceptado los <a href="" target="_blank">términos y condiciones</a>
      </label>
      
      <input class="button btn btn-primary" type="submit" value="Registrarse">
      
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    name: null,
    surname: null,
    email: null,
    day: null,
    month: null,
    year: null,
    pwd: null,
    pwd2: null,
    
    months: [],
    years: [],
  }),
  methods: {
    register() {
      const params = {
        name: this.name,
        surname: this.surname, 
        email: this.email,
        day: this.day,
        month: this.month,
        year: this.year,
        pwd: this.pwd,
      };
      
      this.user.register(params).then(() => {
        this.user.login(this.email, this.pwd);
        this.$router.push('/');
      });
    },
  },
  created() {
    this.months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    for (let i = new Date().getFullYear(); i > 1900; i -= 1) {
      this.years.push(i);
    }
  },
};
</script>
