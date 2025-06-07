import axios from "https://cdn.skypack.dev/axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 10000,
    headers:{
        'Content-Type': 'application/json'
    }
})

//Funções genéricas para as requisições HTTP
export const apiGet = (path, config = {}) => api.get(path, config);
export const apiPost = (path, data, config = {}) => api.post(path, data, config);
export const apiPut = (path, data, config = {}) => api.put(path, data, config);
export const apiDelete = (path, config = {}) => api.delete(path, config);