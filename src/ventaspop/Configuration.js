import Repository from './Repository';

const resource = '/Configuration';

export default {
  async get() {
    return Repository.get(`${resource}`);
  },
};
