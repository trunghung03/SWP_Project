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

const createContent = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/articles/addcontent`, data);
    return response.data;
};


export { getContentList, getContentByTitle, deleteContentById, createContent};


