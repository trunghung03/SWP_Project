import axios from 'axios';

const customerLoginApi = (email, password) => {
    return axios.post("https://localhost:7184/api/accounts/login", { email, password });
}

const employeeLoginApi = (email, password) => {
    return axios.post("https://localhost:7184/api/employees/login", { email, password });
}

const getUserInfo = (email) => {
    return axios.get(`https://localhost:7184/api/accounts/${encodeURIComponent(email)}`);
}

const getEmployeeInfo = (email) => {
    return axios.get(`https://localhost:7184/api/employees/${encodeURIComponent(email)}`);
}

export { customerLoginApi, employeeLoginApi, getUserInfo, getEmployeeInfo };
