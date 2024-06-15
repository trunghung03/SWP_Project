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
  return axios.get(`https://localhost:7184/api/employees/view-order-detail-bill`, { params: { orderId } })
  .then((response) => {
    return response.data;
  })
  .catch(function (error) {
    return error;
  });
}

 const getPurchaseOrderByStatus = async (status) => {
  return axios.get(`${API_BASE_URL_ORDER}/employees/status/${status}`)
}

export {getPurchaseOrderByStatus,getBillDetail,getSalesStaffOrderList,fetchUserByUserId,fetchOrderDetail,fetchAllOrders}
export const sendEmail = async (data) => {
  const response = await axios.post(`https://localhost:7184/api/accounts/send-email`, data);
  return response.data;
};

export const salesStaffUpdateOrderStatus = async (status, orderId) => {
  return axios.get(`https://localhost:7184/api/employees/salesstaff/updatestatus`, { params: { status, orderId } })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

export const deliStaffUpdateOrderStatus = async (status, orderId) => {
  return axios.get(`https://localhost:7184/api/employees/deliverystaff/updatestatus`, { params: { status, orderId } })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
