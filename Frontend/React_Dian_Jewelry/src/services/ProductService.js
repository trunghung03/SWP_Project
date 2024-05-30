import axios from 'axios';

const getProductDetail = (id) => {
    return axios.get(`https://localhost:7184/api/Product/${id}`);
};

const getDiamondDetail = (id) => {
    return axios.get(`https://localhost:7184/api/diamond/${id}`);
};

const getCollectionDetail = (id) => {
    return axios.get(`https://localhost:7184/api/collection/${id}`);
};

const getShellMaterials = () => {
    return axios.get('https://localhost:7184/api/ShellMaterial');
};

const getProductsByIds = (ids) => {
    return axios.get(`https://localhost:7184/api/Product/list`, { params: { ids: ids.join(',') } });
};

const getSizeByCategoryId = (id) => {
    return axios.get(`https://localhost:7184/api/size/${id}`);
};

export { getProductDetail, getDiamondDetail, getCollectionDetail, getShellMaterials, getProductsByIds, getSizeByCategoryId };
