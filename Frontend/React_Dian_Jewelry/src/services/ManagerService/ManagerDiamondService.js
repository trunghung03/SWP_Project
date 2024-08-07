import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Main Diamond
const ShowAllDiamond = async (pageNumber = 1, pageSize = 6, shape = "", clarity = "", color = "", cut = "", search="") => {
  const response = await axios.get(`${API_BASE_URL}/diamonds/all`, {
    params: {
      PageNumber: pageNumber,
      PageSize: pageSize,
      Shape: shape,
      Clarity: clarity,
      Color: color,
      Cut: cut,
      SearchTerm: search
    },
  });
  return response.data;
};

const getCertificateById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/pixeldrain/certificate?id=${id}`);
  return response.data;
};

const updateCertificateById = async (id, data) => {
  const response = await axios.put(`${API_BASE_URL}/diamonds/updatecertificate/${id}`, data);
  return response.data;
};

const getDiamondDetail = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/diamonds/${id}`);
  return response.data;
};

const getDiamondByShape = async (shape) => {
  const response = await axios.get(`${API_BASE_URL}/diamonds/${shape}`);
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

// Sub Diamond
const getAllSubDiamond = async (pageNumber = 1, pageSize = 6, shape = "", clarity = "", color = "", cut = "", search="") => {
  const response = await axios.get(`${API_BASE_URL}/subdiamonds/all`, {
    params: {
      PageNumber: pageNumber,
      PageSize: pageSize,
      Shape: shape,
      Clarity: clarity,
      Color: color,
      Cut: cut,
      SearchTerm: search
    },
  });
  return response.data;
};

const allSubDiamondPDF = async (pageNumber = 1, pageSize = 0) => {
  const response = await axios.get(`${API_BASE_URL}/subdiamonds/all`);
  return response.data.data;
};

const getSubDiamondDetail = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/subdiamonds/${id}`);
  return response.data;
};

const createSubDiamond = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/subdiamonds`, data);
  return response.data;
};

const updateSubDiamondById = (id, data) => {
  return axios.put(`${API_BASE_URL}/subdiamonds/${id}`, data);
};

const deleteSubDiamondById = (id) => {
  return axios.delete(`${API_BASE_URL}/subdiamonds/delete/${id}`);
};

// Diamond Attribute
const getMainDiamondAttribute = async () => {
  const response = await axios.get(`${API_BASE_URL}/diamond-attributes/main`);
  return response.data;
};

const getSubDiamondAttribute = async () => {
  const response = await axios.get(`${API_BASE_URL}/diamond-attributes/sub`);
  return response.data;
};

const allMainDiamondPDF = async () => {
  const response = await axios.get(`${API_BASE_URL}/diamonds/alldiamondwithoutpagination`);
  return response.data;
};

export {
  ShowAllDiamond,
  getDiamondDetail,
  deleteDiamondById,
  updateDiamondById,
  createDiamond,
  getDiamondByShape,
  getCertificateById,
  updateCertificateById,
  getAllSubDiamond,
  getSubDiamondDetail,
  createSubDiamond,
  updateSubDiamondById,
  deleteSubDiamondById,
  getMainDiamondAttribute,
  getSubDiamondAttribute,
  allSubDiamondPDF,
  allMainDiamondPDF
};
