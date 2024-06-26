import axios from 'axios';

// const API_BASE_URL = 'https://localhost:7184/api';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ShowAllDiamond = async (pageNumber = 1, pageSize = 6) => {
  const response = await axios.get(`${API_BASE_URL}/diamonds/all`, {
    params: {
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
  });
  return response.data;
};
const getCertificateById= async (id) => {
  const response = await axios.get(`${API_BASE_URL}/pixeldrain/certificate?id=${id}`);
  return response.data;
}
const updateCertificateById = async(id,data) =>{
  const response = await axios.put(`${API_BASE_URL}/diamonds/updatecertificate/${id}`,data);
  return response.data;
}
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

export { ShowAllDiamond, getDiamondDetail, deleteDiamondById, updateDiamondById, createDiamond, getDiamondByShape,getCertificateById,updateCertificateById };
