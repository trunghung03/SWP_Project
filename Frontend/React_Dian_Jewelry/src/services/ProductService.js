import axios from 'axios';

const API_BASE_URL = 'https://localhost:7184/api';

const getProductList = () => {
    return axios.get(`${API_BASE_URL}/products/list`);
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

export { getProductList, getProductDetail, getDiamondDetail, getCollectionDetail, getShellMaterials, getProductsByIds };
