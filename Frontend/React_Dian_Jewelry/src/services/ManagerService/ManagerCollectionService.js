import axios from "axios";
// const API_BASE_URL = 'https://localhost:7184/api';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ShowAllCollection = async () => {
    const response = await axios.get(`${API_BASE_URL}/collections`);
    return response.data;
};

const deleteCollectionById = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/collections?${id}`);
    return response.data;
};

const searchCollectionById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/collections/${id}`);
    return response.data;
};

const addCollection = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/collections`, data);
    return response.data;
};

const updateCollectionById = async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/collections/${id}`, data);
    return response.data;
};

const changeStatus = async (id) => {
    const response = await axios.put(`${API_BASE_URL}/collections/update/${id}`);
    return response.data;
};

export { ShowAllCollection, deleteCollectionById, searchCollectionById, addCollection, updateCollectionById, changeStatus };
