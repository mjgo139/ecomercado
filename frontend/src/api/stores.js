import axios from './axios'

export const getStoresRequest = () => axios.get("/stores");

export const getStoresAdminRequest = () => axios.get("/stores/admin");

export const getStoreRequest = (id) => axios.get(`/stores/${id}`);

export const updateStatusRequest = (id, status) => axios.put(`/stores/status/${id}`,status);

export const getStoresByOwnerRequest = () => axios.get(`/stores/owner`);

export const createStoreRequest = (store) => axios.post("/stores",store);

export const updateStoreRequest = (id, store) => axios.put(`/stores/${id}`, store)

export const deleteStoreRequest = (id) => axios.delete(`/stores/${id}`);
