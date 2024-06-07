import axios from 'axios';

const API_BASE_URL = 'https://localhost:7184/api';

const getContentList = () => {
    return axios.get(`${API_BASE_URL}/articles`);
};

const getContentByTitle = (title) => {
    return axios.get(`${API_BASE_URL}/articles/${title}`);
};

const deleteContentById = (id) => {
    return axios.delete(`${API_BASE_URL}/articles/delete/${id}`);
};

export { getContentList, getContentByTitle, deleteContentById };


