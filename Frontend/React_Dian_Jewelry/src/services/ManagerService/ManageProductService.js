import axios from 'axios';

const API_BASE_URL = 'https://localhost:7184/api';

const getProductDetail = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/detail/${id}`);
  return response.data;
};


const ShowAllProduct = async () => {
  const response = await axios.get(`${API_BASE_URL}/products/all`);
  return response.data;
}

const deleteProductById = (id) => {
  return axios.delete(`${API_BASE_URL}/products/delete/${id}`);
};

const createProduct = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/products`, data);
  return response.data;
};

export { ShowAllProduct, deleteProductById, createProduct, getProductDetail};
