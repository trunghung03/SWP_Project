import axios from 'axios';

// const API_BASE_URL = 'https://localhost:7184/api';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getProductDetail = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

const getProductByName = async (name) => {
  const response = await axios.get(`${API_BASE_URL}/products/all?Name=${name}`);
  return response.data;
};

const updateProductById = (id, data) => {
  return axios.put(`${API_BASE_URL}/products/${id}`, data);
};

const ShowAllProduct = async (pageNumber = 1, pageSize = 7) => {
  const response = await axios.get(`${API_BASE_URL}/products/all`, {
    params: {
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
  });
  return response.data;
};

const deleteProductById = (id) => {
  return axios.delete(`${API_BASE_URL}/products/${id}`);
};

const createProduct = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/products`, data);
  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
  return response.data;
};
const getProductCollection = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/collections/${id}`);
  return response.data;
};

const getAllCategories = async () =>{
  const response = await axios.get(`${API_BASE_URL}/categories`)
  return response.data;
}

const getProductDiamond = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/diamonds/${id}`);
  return response.data;
};

const getAllCollection = async () => {
  const response = await axios.get(`${API_BASE_URL}/collections`);
  return response.data;
};

export { ShowAllProduct, deleteProductById, createProduct, getProductDetail, updateProductById, getProductCategory, getAllCollection,getProductCollection,getProductDiamond, getAllCategories,getProductByName };
