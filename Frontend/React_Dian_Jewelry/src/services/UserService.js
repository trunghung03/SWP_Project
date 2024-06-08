import axios from 'axios';

const API_BASE_URL = 'https://localhost:7184/api';

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

const updateCustomerInfo = (id, data) => {
    return axios.put(`${API_BASE_URL}/accounts/${id}`, data);
}

const forgotPasswordApi = (email) => {
    return axios.post(`${API_BASE_URL}/accounts/forgot-password`, { email });
}

export { customerLoginApi, employeeLoginApi, getUserInfo, getEmployeeInfo, updateCustomerInfo, forgotPasswordApi };
