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