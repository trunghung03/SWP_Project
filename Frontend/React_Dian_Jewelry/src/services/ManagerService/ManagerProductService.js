import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getProductDetail = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

const getManageProductDetail = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/product-detail/${id}`);
  return response.data;
};

const updateProductById = (id, data) => {
  return axios.put(`${API_BASE_URL}/products/${id}`, data);
};

const ShowAllProduct = async (pageNumber = '', pageSize = '', searchTerm = '') => {
  const response = await axios.get(`${API_BASE_URL}/products/all`, {
    params: {
      PageNumber: pageNumber,
      PageSize: pageSize,
      SearchTerm: searchTerm,
    },
  });
  return response.data;
};


const pdfProduct = async () => {
  const response = await axios.get(`${API_BASE_URL}/products/list`);
  return response;
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

const getAllCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
};

const getProductDiamond = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/diamonds/${id}`);
  return response.data;
};

const getAllCollection = async (role) => {
  const response = await axios.get(`${API_BASE_URL}/collections?role=${role}`);
  return response.data;
};

const uploadImage = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/pixeldrain/upload`, data);
  return response.data;
};

export {
  ShowAllProduct,
  pdfProduct,
  deleteProductById,
  createProduct,
  getProductDetail,
  getManageProductDetail,
  updateProductById,
  uploadImage,
  getProductCategory,
  getAllCollection,
  getProductCollection,
  getProductDiamond,
  getAllCategories,
};
