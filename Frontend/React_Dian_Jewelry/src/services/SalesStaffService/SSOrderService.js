import axios from "axios";

const API_BASE_URL_ORDER = 'https://localhost:7184/api';

//get list orders

export const fetchAllOrders = async () => {
  return axios.get(`${API_BASE_URL_ORDER}/purchaseorders/all`)
  .then((response) => {
    return response.data;
  })
  .catch(function (error) {
    return error;
  });
};

//get order detail by id

export const fetchOrderDetail = async (id) => {
  return axios.get(`${API_BASE_URL_ORDER}/purchaseorders/${id}`)
  .then((response) => {
    return response.data;
  })
  .catch(function (error) {
    return error;
  });
}
