import axios from 'axios';

// const API_BASE_URL = 'https://localhost:7184/api';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const ShowAllCustomer = async () => {
  const response = await axios.get(`${API_BASE_URL}/accounts`);
  return response.data;
};

const updateCustomerById = (email, data) => {
  return axios.put(`${API_BASE_URL}/accounts/${email}`, data);
};
const getCustomerDetail = async (email) => {
  const response = await axios.get(`${API_BASE_URL}/accounts/${email}`);
  return response.data;
};

const changeStatus = async (id) => {
  const response = await axios.put(`${API_BASE_URL}/employees/customer/${id}`);
  return response.data;
};

const getCustomer = async (email) => {
  const response = await axios.get(`${API_BASE_URL}/accounts/${email}`);
  return response.data;
};

const getCustomerByName = async (name) => {
  const response = await axios.get(`${API_BASE_URL}/accounts/search/name/${name}`);
  return response.data;
}

const getCustomerById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/accounts/id/${id}`);
  return response.data;
}

const createCustomer = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/Customers/registerCustomer`, data);
  return response.data;
};

export { ShowAllCustomer, getCustomerDetail,  updateCustomerById, createCustomer, getCustomerByName,changeStatus, getCustomerById};