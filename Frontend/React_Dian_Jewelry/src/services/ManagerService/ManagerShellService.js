import axios from "axios";
// const API_BASE_URL = 'https://localhost:7184/api';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const ShowAllShellMaterial = async () => {
    const response = await axios.get(`${API_BASE_URL}/shellmaterials`);
    return response.data;
  };
  
  const ShowAllShell = async (pageNumber, pageSize) => {
    const response = await axios.get(`${API_BASE_URL}/shells`, {
      params: { pageNumber, pageSize }
    });
    return response.data;
  };
  
  const updateShellMaterialById = (id, data) => {
    return axios.put(`${API_BASE_URL}/shellmaterials/${id}`, data);
  };
  const getShellMaterialDetail = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/shellmaterials/${id}`);
    return response.data;
  };
  const getShellMaterialByName = async (name) => {
    const response = await axios.get(`${API_BASE_URL}/shellmaterials/${name}`);
    return response.data;
  };
  const deleteShellMaterialById = async (id) =>{
    return axios.delete(`${API_BASE_URL}/shellmaterials/${id}`);
  }
  const createShellMaterial = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/shellmaterials`, data);
    return response.data;
  };

  const deleteShellById = async (id) => {
    return axios.delete(`${API_BASE_URL}/shells/${id}`);
  };

  const updateShellById = async (id,data) => {
    const response = await axios.put(`${API_BASE_URL}/shells/${id}`,data);
    return response.data;
  };
  
  const createShell = async (data) =>{
    const response = await axios.post(`${API_BASE_URL}/shells`,data);
    return response.data;
  }


  export {ShowAllShell, getShellMaterialDetail,deleteShellMaterialById,updateShellMaterialById,createShellMaterial,getShellMaterialByName
    ,ShowAllShellMaterial,updateShellById,deleteShellById,createShell};