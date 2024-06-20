import axios from 'axios';

// const API_BASE_URL = 'https://localhost:7184/api';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getProductList = () => {
    return axios.get(`${API_BASE_URL}/products/list`);
};

const getCollectionList = () => {
    return axios.get(`${API_BASE_URL}/collections`);
};

const getProductDetail = (id) => {
    return axios.get(`${API_BASE_URL}/products/${id}`);
};

const getDiamondDetail = (id) => {
    return axios.get(`${API_BASE_URL}/diamonds/${id}`);
};

const getCollectionDetail = (id) => {
    return axios.get(`${API_BASE_URL}/collections/${id}`);
};

const getShellMaterials = () => {
    return axios.get(`${API_BASE_URL}/shellmaterials`);
};

const getProductsByIds = (ids) => {
    return axios.get(`${API_BASE_URL}/products/list`, { params: { ids: ids.join(',') } });
};

export { getProductList, getCollectionList, getProductDetail, getDiamondDetail, getCollectionDetail, getShellMaterials, getProductsByIds };
