import axios from 'axios';
let request = axios.create({
  baseURL:"https://www.tooyyy77.cn:3001/api",
  timeout: 5000,
})
export default request
