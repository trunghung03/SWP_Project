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

export { getProductDetail, getDiamondDetail, getCollectionDetail, getShellMaterials };
 