import axios from "axios";

// const API_BASE_URL = "https://localhost:7184/api";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getDeliveryOrderDetail = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/purchaseorders/${id}`);
  return response.data;
};

const getAllDeliveryOrder = async () => {
  const response = await axios.get(`${API_BASE_URL}/purchaseorders/all`);
  return response.data;
};

const updateDeliveryStatus = (id, data) => {
  return axios.put(`${API_BASE_URL}/purchaseorders/${id}`, data);
};

const getDeliveryStaffOrderList = async (staffId, pageNumber = 1, pageSize = 6, status = 'default') => {
  return axios.get(`${API_BASE_URL}/employees/deliverystaff/orderlists`, {
    params: { staffId, pageNumber, pageSize, status }
  }).then(response => response.data)
    .catch(error => {
      console.error("Error fetching orders:", error);
      throw error;
    });
};
const getDeliPurchaseOrderByStatus = async (status, id) => {
  return axios.get(`${API_BASE_URL}/employees/deliverystaff/status/${status}`,{params:{id}})
}
export {
  getDeliveryOrderDetail,
  getAllDeliveryOrder,
  updateDeliveryStatus,
  getDeliPurchaseOrderByStatus,
  getDeliveryStaffOrderList
};
