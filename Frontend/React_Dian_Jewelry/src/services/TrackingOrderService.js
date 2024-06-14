import axios from 'axios';

const API_URL = 'https://localhost:7184/api';

export const getAllOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/purchaseorders/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const getOrderById = async (orderId) => {
    try {
        const response = await axios.get(`${API_URL}/purchaseorders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};

export const getPromotionById = async (promotionId) => {
    try {
        const response = await axios.get(`${API_URL}/promotions/${promotionId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching promotion details:', error);
        throw error;
    }
};

export const getOrderDetailsByOrderId = async (orderId) => {
    try {
        const response = await axios.get(`${API_URL}/orderdetails?orderId=${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};

export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
};

export const getShellMaterialById = async (shellMaterialId) => {
    try {
        const response = await axios.get(`${API_URL}/shellmaterials/${shellMaterialId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching shell material details:', error);
        throw error;
    }
};
export const fetchUserByUserId = async (id) => {
    return axios.get(`https://localhost:7184/api/accounts/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  }


  export const getAssignOrders = async (id) => {
    return axios.get(`https://localhost:7184/api/employees/salesstaff/orderlists?staffId={id}`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  }