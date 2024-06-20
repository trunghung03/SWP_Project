import axios from 'axios';

// const API_URL = 'https://localhost:7184/api';
const API_URL = process.env.REACT_APP_API_BASE_URL;

export const createPurchaseOrder = async (orderData, promotionCode) => {
    try {
        const url = `${API_URL}/purchaseorders/checkout?promotionCode=${promotionCode ? promotionCode : 'null'}`;
        const response = await axios.post(url, orderData);
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

export const requestVNPayPayment = async (paymentData) => {
    try {
        const response = await axios.post(`${API_URL}/purchaseorders/request-vnpay-payment`, paymentData);
        return response.data;
    } catch (error) {
        console.error('Error requesting VNPAY payment:', error);
        throw error;
    }
};
