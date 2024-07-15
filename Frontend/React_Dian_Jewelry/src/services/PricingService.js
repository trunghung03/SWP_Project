import axios from 'axios';

const API_BASE_URL = 'https://localhost:7184/api';
const SHELL_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getDiamondPrice = (cut, carat, clarity, color) => {
  const data = {
    cut: cut,
    carat: parseFloat(carat),
    clarity: clarity,
    color: color
  };

  return axios.post(`${API_BASE_URL}/diamond_price/`, data);
};

const getShellMaterials = () => {
  return axios.get(`${SHELL_API_BASE_URL}/shellmaterials`);
};

const getShellMaterialById = (id) => {
  return axios.get(`${SHELL_API_BASE_URL}/shellmaterials/${id}`);
};

const getAllDiamonds = () => {
  return axios.get(`${API_BASE_URL}/diamonds/alldiamondwithoutpagination`);
};

export { getDiamondPrice, getShellMaterials, getShellMaterialById, getAllDiamonds };
