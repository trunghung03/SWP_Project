import axios from "axios";
// const API_BASE_URL = 'https://localhost:7184/api';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const ShowAllShellMaterial = async () => {
    const response = await axios.get(`${API_BASE_URL}/shellmaterials`);
    return response.data;
  };
  
  const ShowAllShell = async () => {
    const response = await axios.get(`${API_BASE_URL}/shells`);
    return response.data;
  };

  const updateShellMaterialById = (id, data) => {
    return axios.put(`${API_BASE_URL}/shellmaterials/${id}`, data);
  };
  const getShellDetail = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/shellmaterials/${id}`);
    return response.data;
  };
  const getShellByName = async (name) => {
    const response = await axios.get(`${API_BASE_URL}/shellmaterials/${name}`);
    return response.data;
  };
  const deleteShellById = async (id) =>{
    return axios.delete(`${API_BASE_URL}/shellmaterials/${id}`);
  }
  const createShell = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/shellmaterials`, data);
    return response.data;
  };
  export {ShowAllShell, getShellDetail,deleteShellById,updateShellMaterialById,createShell,getShellByName,ShowAllShellMaterial};