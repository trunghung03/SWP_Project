import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const googleLoginApi = (body) => {
    return axios.post(`${API_BASE_URL}/accounts/login-gg`, body);
}

const customerLoginApi = (email, password) => {
    return axios.post(`${API_BASE_URL}/accounts/login`, { email, password });
}

const employeeLoginApi = (email, password) => {
    return axios.post(`${API_BASE_URL}/employees/login`, { email, password });
}

const getUserInfo = (email) => {
    return axios.get(`${API_BASE_URL}/accounts/${encodeURIComponent(email)}`);
}

const getEmployeeInfo = (email) => {
    return axios.get(`${API_BASE_URL}/employees/${encodeURIComponent(email)}`);
}
const getNotifications = async (customerId) => {
    return axios.get(`${API_BASE_URL}/api/notifications/all`, { params: { customerId } })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  }

const updateCustomerInfo = (id, data) => {
    return axios.put(`${API_BASE_URL}/accounts/${id}`, data);
}

const forgotPasswordApi = (email) => {
    return axios.post(`${API_BASE_URL}/accounts/forgot-password`, { email });
}

const resetPasswordApi = (data) => {
    return axios.post(`${API_BASE_URL}/accounts/reset-password`, data);
}

const registerCustomerApi = (data) => {
    return axios.post(`${API_BASE_URL}/accounts/registercustomer`, data);
}

export { 
    customerLoginApi, 
    employeeLoginApi, 
    getUserInfo, 
    getEmployeeInfo, 
    getNotifications,
    googleLoginApi,
    updateCustomerInfo, 
    forgotPasswordApi, 
    resetPasswordApi,
    registerCustomerApi
};
