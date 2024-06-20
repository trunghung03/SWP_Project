import axios from 'axios';

// const API_BASE_URL = 'https://localhost:7184/api';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ShowAllEmployee = async () => {
  const response = await axios.get(`${API_BASE_URL}/employees`);
  return response.data;
};

const updateEmployeeById = (id, data) => {
  return axios.put(`${API_BASE_URL}/employees/${id}`, data);
};
const getEmployeeDetail = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/employees/id/${id}`);
  return response.data;
};
const getEmployeeByRole = async (role) => {
  const response = await axios.get(`${API_BASE_URL}/employees/role/${role}`);
  return response.data;
};
const createEmployee = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/employees/registeremployee`, data);
  return response.data;
};
const deleteEpmloyeeById = async (id) => {
  return axios.delete(`${API_BASE_URL}/employees/${id}`);
}
export { ShowAllEmployee, getEmployeeDetail, deleteEpmloyeeById, updateEmployeeById, createEmployee, getEmployeeByRole };