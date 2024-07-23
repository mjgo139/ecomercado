import axios from './axios'

export const getProductsByStoreRequest = (id) => axios.get(`/products/store/${id}`);

export const getProductsByCategoryRequest = (id) => axios.get(`/products/category/${id}`);

export const getProductRequest = (id) => axios.get(`/products/${id}`);

export const createProductRequest = (product) => axios.post("/products",product);

export const updateProductRequest = (id, product) => axios.put(`/products/${id}`, product)

export const deleteProductRequest = (id) => axios.delete(`/products/${id}`);
