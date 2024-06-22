import axios from "axios";

// const API_BASE_URL_ORDER = 'https://localhost:7184/api';
const API_BASE_URL_ORDER = process.env.REACT_APP_API_BASE_URL;
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
  return axios.get(`${API_BASE_URL_ORDER}/accounts/${id}`)
  .then((response) => {
    return response.data;
  })
  .catch(function (error) {
    return error;
  });
}
 const getSalesStaffOrderList = async (staffId) => {
  return axios.get(`${API_BASE_URL_ORDER}/employees/salesstaff/orderlists`, { params: { staffId } })
  .then((response) => {
    return response.data;
  })
  .catch(function (error) {
    return error;
  });
}
 const getBillDetail = async (orderId) => {
  return axios.get(`${API_BASE_URL_ORDER}/employees/view-order-detail-bill`, { params: { orderId } })
  .then((response) => {
    return response.data;
  })
  .catch(function (error) {
    return error;
  });
}

 const getPurchaseOrderByStatus = async (status, id) => {
  return axios.get(`${API_BASE_URL_ORDER}/employees/salesstaff/status/${status}`,{params:{id}})
}

export {getPurchaseOrderByStatus,getBillDetail,getSalesStaffOrderList,fetchUserByUserId,fetchOrderDetail,fetchAllOrders}
export const sendEmail = async (data) => {
  const response = await axios.post(`${API_BASE_URL_ORDER}/accounts/send-email`, data);
  return response.data;
};

export const salesStaffUpdateOrderStatus = async (status, orderId) => {
  return axios.put(`${API_BASE_URL_ORDER}/employees/salesstaff/updatestatus`, {}, { params: { status, orderId } })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

export const deliStaffUpdateOrderStatus = async (status, orderId) => {
  return axios.put(`${API_BASE_URL_ORDER}/employees/deliverystaff/updatestatus`, {}, { params: { status, orderId } })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
export const sendWarrantyEmail = async (data) => {
  const response = await axios.post(`${API_BASE_URL_ORDER}/accounts/send-email`, data);
  return response.data;
};

export const getWarrantyURL = async (id) => {
  return axios.get(`${API_BASE_URL_ORDER}/pdf/warranty`, { params: { id } })
}

