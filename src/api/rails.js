import axios from 'axios';

export default axios.create({
  baseURL: 'https://flexicon-api.herokuapp.com/api/v1';
});
