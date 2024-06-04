import axios from 'axios';

const API_BASE_URL = 'https://localhost:7184/api';

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
const deleteEpmloyeeById = async (id) =>{
  return axios.delete(`${API_BASE_URL}/employees/${id}`);
}
export {ShowAllEmployee, getEmployeeDetail,deleteEpmloyeeById,updateEmployeeById};