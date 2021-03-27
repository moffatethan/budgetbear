import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  responseType: 'json',
  validateStatus: (status) => {
    return status < 500;
  }
});

export default instance;