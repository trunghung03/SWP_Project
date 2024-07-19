import axios from 'axios';

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

const getShellByProductId = (productId) => {
    return axios.get(`${API_BASE_URL}/shells/product/${productId}`);
};

const getProductsByIds = (ids) => {
    return axios.get(`${API_BASE_URL}/products/list`, { params: { ids: ids.join(',') } });
};

const getNewestProducts = () => {
    return axios.get(`${API_BASE_URL}/products/newest`);
};

const getTopSellingProducts = () => {
    return axios.get(`${API_BASE_URL}/stat/top-8-selling-products`);
};

const getNewestCollections = () => {
    return axios.get(`${API_BASE_URL}/collections/newest`);
};

const searchProducts = (query) => {
    return axios.get(`${API_BASE_URL}/products/search`, { params: { name: query } });
};

export { 
    getProductList, 
    getCollectionList, 
    getProductDetail, 
    getDiamondDetail, 
    getCollectionDetail, 
    getShellMaterials, 
    getProductsByIds, 
    getNewestProducts, 
    getTopSellingProducts, 
    getNewestCollections,
    searchProducts,
    getShellByProductId 
};
