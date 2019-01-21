export default {
  methods: {
    price(price) {
      return `$${Number(price).toLocaleString('es')}`;
    },
  },
};
