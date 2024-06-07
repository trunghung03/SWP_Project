import axios from 'axios';

const API_URL = 'https://localhost:7184/api';

export const createPurchaseOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/purchaseorders`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating purchase order:', error);
        throw error;
    }
};

export const createOrderDetails = async (orderDetails) => {
    try {
        const response = await axios.post(`${API_URL}/orderdetails`, orderDetails);
        return response.data;
    } catch (error) {
        console.error('Error creating order details:', error);
        throw error;
    }
};

export const getPurchaseOrderById = async (orderId) => {
    try {
        const response = await axios.get(`${API_URL}/purchaseorders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching purchase order:', error);
        throw error;
    }
};

export const getOrderDetailsByOrderId = async (orderId) => {
    try {
        const response = await axios.get(`${API_URL}/orderdetails`, { params: { orderId } });
        return response.data.filter(detail => detail.orderId === orderId);
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};

export const getPromotionByCode = async (code) => {
    try {
        const response = await axios.get(`${API_URL}/promotions/promotion/${code}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching promotion:', error);
        throw error;
    }
};
