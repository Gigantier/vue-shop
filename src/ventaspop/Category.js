import Repository from './Repository';

const resource = '/Category';

export default {
  async get() {
    const categories = await Repository.get(`${resource}`);
    categories.data = categories.data.map((category) => {
      const newCategory = category;
      newCategory.url = this.url(category);
      return newCategory;
    });
    return categories;
  },
  url(category) {
    const path = category.name.toLowerCase().trim().replace(' ', '-');
    return encodeURI(`/catalogo/${category.id}-${path}`);
  },
};
