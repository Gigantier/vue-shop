import axios from 'axios';

const baseDomain = 'http://localhost:3500';
const baseURL = `${baseDomain}/`;

export default axios.create({
  baseURL,
});
