import axios from 'axios';

const API_BASE_URL = 'https://localhost:7184/api';

const ShowAllDiamond = async () => {
  const response = await axios.get(`${API_BASE_URL}/diamonds/all`);
  return response.data;
};

const getDiamondDetail = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/diamonds/${id}`);
  return response.data;
};

const deleteDiamondById = (id) => {
  return axios.delete(`${API_BASE_URL}/diamonds/delete/${id}`);
};

const updateDiamondById = (id, data) => {
  return axios.put(`${API_BASE_URL}/diamonds/update/${id}`, data);
};

const createDiamond = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/diamonds/creatediamond`, data);
  return response.data;
};

const getProductDetail = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/detail/${id}`);
  return response.data;
};


const ShowAllProduct = async () => {
  const response = await axios.get(`${API_BASE_URL}/products/list`);
  return response.data;
}

const deleteProductById = (id) => {
  return axios.delete(`${API_BASE_URL}/products/delete/${id}`);
};

// const updateProductById = (id, data) => {
//   return axios.put(`${API_BASE_URL}/diamonds/update/${id}`, data);
// };

const createProduct = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/products`, data);
  return response.data;
};

export { ShowAllDiamond, getDiamondDetail, deleteDiamondById, updateDiamondById, createDiamond, ShowAllProduct, deleteProductById, createProduct, getProductDetail};
