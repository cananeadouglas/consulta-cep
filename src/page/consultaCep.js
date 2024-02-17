import axios from 'axios';

const api = axios.create({
    baseURL: "https://cep.awesomeapi.com.br/json/",
    ContentType: 'application/json',
})

export default api;

