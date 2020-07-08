import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-react-12264.firebaseio.com/'
})

export default instance;
