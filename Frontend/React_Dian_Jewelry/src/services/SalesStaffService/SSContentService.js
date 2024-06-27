
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getContentList = () => {
    return axios.get(`${API_BASE_URL}/articles`);
};

const getContentByTitle = (title) => {
    return axios.get(`${API_BASE_URL}/articles/${title}`);
};

const getContentById = (id) => {
    return axios.get(`${API_BASE_URL}/articles/${id}`);
};

const deleteContentById = (id) => {
    return axios.delete(`${API_BASE_URL}/articles/delete/${id}`);
};

const createContent = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/articles/addcontent`, data);
    return response.data;
};
const updateContentById = async (id, contentData) => {
    const response = await axios.put(`${API_BASE_URL}/articles/update/${id}`, contentData);
    return response.data;
  };

const uploadImage = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/pixeldrain/upload`, data);
    return response.data;
};


export { getContentList, getContentByTitle, deleteContentById, createContent, updateContentById, getContentById, uploadImage};


