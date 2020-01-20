 import axios from 'axios';


const apis = axios.create({
     baseURL: process.env.REACT_APP_API_URL
});

export default apis;