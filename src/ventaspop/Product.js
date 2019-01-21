import Repository from './Repository';

const resource = '/Product';

export default {
  async get(params) {
    const paramsQuery = Object.keys(params).map(value => `${value}=${encodeURIComponent(params[value])}`).join('&');
    const products = await Repository.get(`${resource}?${paramsQuery}`);

    products.data = products.data.map((product) => {
      const newProduct = product;
      newProduct.url = this.url(product);
      return newProduct;
    });

    return products;
  },
  url(product) {
    const path = product.name.toLowerCase().trim().replace(' ', '-');
    return encodeURI(`/${product.id}-${path}`);
  },
};
