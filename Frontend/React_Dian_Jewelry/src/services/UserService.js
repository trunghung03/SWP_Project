import axios from 'axios';

const customerLoginApi = (email, password) => {
    return axios.post("https://localhost:7184/api/account/login", { email, password });
}

const employeeLoginApi = (email, password) => {
    return axios.post("https://localhost:7184/api/employee/login", { email, password });
}

const getUserInfo = (email) => {
    return axios.get(`https://localhost:7184/api/account/${encodeURIComponent(email)}`);
}

export { customerLoginApi, employeeLoginApi, getUserInfo };
