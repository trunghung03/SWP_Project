import axios from "axios";

const API_BASE_URL = "https://localhost:7184/api";

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

export const getDeliveryStaffOrderList = async (staffId) => {
  return axios
    .get(`https://localhost:7184/api/employees/deliverystaff/orderlists`, {
      params: { staffId },
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
export {
  getDeliveryOrderDetail,
  getAllDeliveryOrder,
  updateDeliveryStatus,

};
