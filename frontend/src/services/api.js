 import axios from 'axios';


const apis = axios.create({
     baseURL: 'http://localhost:3333'
});

export default apis;