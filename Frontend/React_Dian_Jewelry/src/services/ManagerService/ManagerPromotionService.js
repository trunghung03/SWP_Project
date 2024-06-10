import axios from "axios";
const API_BASE_URL = 'https://localhost:7184/api';
const ShowAllPromotion = async () => {
    const response = await axios.get(`${API_BASE_URL}/promotions/list`);
    return response.data;
  };
  
  const updatePromotionById = (id, data) => {
    return axios.put(`${API_BASE_URL}/Promotionmaterials/${id}`, data);
  };
  const getPromotionDetail = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/promotions/${id}`);
    return response.data;
  };
  const getPromotionByName = async (name) => {
    const response = await axios.get(`${API_BASE_URL}/promotions/promotion/${name}`);
    return response.data;
  };
  const deletePromotionById = async (id) =>{
    return axios.delete(`${API_BASE_URL}/Promotionmaterials/${id}`);
  }
  const createPromotion = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/promotions/createpromotion`, data);
    return response.data;
  };
  export {ShowAllPromotion, getPromotionDetail,deletePromotionById,updatePromotionById,createPromotion,getPromotionByName};