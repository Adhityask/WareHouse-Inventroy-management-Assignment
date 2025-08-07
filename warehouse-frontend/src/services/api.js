import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Django backend URL
});

export const fetchProducts = () => API.get('/products/');
export const createProduct = (data) => API.post('/products/', data);
export const fetchInventory = () => API.get('/inventory/');
export const createTransaction = (data) => API.post('/transactions/', data);