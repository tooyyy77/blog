import axios from 'axios';
let request = axios.create({
  baseURL:"http://81.71.153.104:3000/api",
  timeout: 5000,
})
export default request
