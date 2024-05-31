import axios from 'axios';

const API_BASE_URL = 'https://localhost:7184/api';

const getProductList = () => {
    return axios.get(`${API_BASE_URL}/Product/list`);
};

const getProductDetail = (id) => {
    return axios.get(`${API_BASE_URL}/Product/${id}`);
};

const getDiamondDetail = (id) => {
    return axios.get(`${API_BASE_URL}/diamond/${id}`);
};

const getCollectionDetail = (id) => {
    return axios.get(`${API_BASE_URL}/collection/${id}`);
};

const getShellMaterials = () => {
    return axios.get(`${API_BASE_URL}/ShellMaterial`);
};

const getProductsByIds = (ids) => {
    return axios.get(`${API_BASE_URL}/Product/list`, { params: { ids: ids.join(',') } });
};

export { getProductList, getProductDetail, getDiamondDetail, getCollectionDetail, getShellMaterials, getProductsByIds };
