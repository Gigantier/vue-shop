<template>
  <div class="container clearfix" id="page">

    <h1>{{page.title}}</h1>

    <div v-html="page.body"></div>
    <div v-html="page.body2"></div>

  </div>
</template>

<script>
import page from '../ventaspop/Page';

export default {
  name: 'Page',
  data: () => ({
    page: { },
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
      page.getPage(id).then((p) => { this.page = p.data; });
    },
  },
};
</script>
