import axios from 'axios';

const loginApi = (email, password) => {
    return axios.post("https://localhost:7184/api/account/login", { email, password });
}

export { loginApi };
