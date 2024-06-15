import axios from "axios";

const API_BASE_URL_ORDER = 'https://localhost:7184/api';

//get list orders

 const fetchAllOrders = async () => {
  return axios.get(`${API_BASE_URL_ORDER}/purchaseorders/all`)
  .then((response) => {
    return response.data;
  })
  .catch(function (error) {
    return error;
  });
};

//get order detail by id

 const fetchOrderDetail = async (id) => {
  return axios.get(`${API_BASE_URL_ORDER}/purchaseorders/${id}`)
  .then((response) => {
    return response.data;
  })
  .catch(function (error) {
    return error;
  });
}
 const fetchUserByUserId = async (id) => {
  return axios.get(`https://localhost:7184/api/accounts/${id}`)
  .then((response) => {
    return response.data;
  })
  .catch(function (error) {
    return error;
  });
}
 const getSalesStaffOrderList = async (staffId) => {
  return axios.get(`https://localhost:7184/api/employees/salesstaff/orderlists`, { params: { staffId } })
  .then((response) => {
    return response.data;
  })
  .catch(function (error) {
    return error;
  });
}
 const getBillDetail = async (orderId) => {
  return axios.get(`https://localhost:7184/api/employees/view-order-detail-bill?orderId=${orderId}`)
}

 const getPurchaseOrderByStatus = async (status) => {
  return axios.get(`${API_BASE_URL_ORDER}/purchaseorders/status/${status}`)
}

export {getPurchaseOrderByStatus,getBillDetail,getSalesStaffOrderList,fetchUserByUserId,fetchOrderDetail,fetchAllOrders}