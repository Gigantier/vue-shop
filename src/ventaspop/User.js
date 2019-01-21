import Repository from './Repository';

const resource = '/User';

export default {
  
  logged: false, 

  init() {
    this.logged = (this.accessToken() != null && this.expires() >= new Date().getTime());
  },
  
  accessToken() {
    return localStorage.accessToken;
  },
  
  expires() {
    return localStorage.expires * 1000;
  },
  
  setAccessToken(token) {
    localStorage.accessToken = token;
  },

  setExpires(expires) {
    localStorage.expires = expires;
  },

  async login(email, pwd) {
    return new Promise((res, rej) => {
      Repository.post(`${resource}/login`, { email, pwd }).then((data) => {
        this.setAccessToken(data.data.accessToken);
        this.setExpires(data.data.expires);
        this.init();
        res(data);
      }, rej);
    });
  },
  
  logout() {
    this.setAccessToken(null);
    this.setExpires(0);
    this.init();
  },

  async register(user) {
    return Repository.post(`${resource}`, user);
  },
  

};
