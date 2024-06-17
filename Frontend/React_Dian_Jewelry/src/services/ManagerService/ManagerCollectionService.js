import axios from "axios";
const API_BASE_URL = 'https://localhost:7184/api';
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
const updateCollectionById = async (id) => {
    const response = await axios.put(`${API_BASE_URL}/collections/${id}`);
    return response.data;
};
const changeStatus = async (id) => {
    const response = await axios.put(`${API_BASE_URL}/collections/update/${id}`);
    return response.data;
}
export { ShowAllCollection, deleteCollectionById , searchCollectionById , updateCollectionById , changeStatus}