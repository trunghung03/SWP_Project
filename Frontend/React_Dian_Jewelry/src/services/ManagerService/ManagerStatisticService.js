import axios from "axios";
// const API_BASE_URL = 'https://localhost:7184/api';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AllCurrentProduct = async () => {
    const response = await axios.get(`${API_BASE_URL}/stat/products`);
    return response.data;
};

const GetSoldCategory = async (startMonth,endMonth) => {
    const response = await axios.get(`${API_BASE_URL}/stat/products/soldpercentage?startMonthYear=${startMonth}&endMonthYear=${endMonth}`);
    return response.data;
};

const TotalOrders = async (year) => {
    const response = await axios.get(`${API_BASE_URL}/stat/monthlyPurchaseOrderCount?year=${year}`);
    return response.data;
};

const TotalValue = async (year) => {
    const response = await axios.get(`${API_BASE_URL}/stat/monthlyTotalValue?year=${year}`);
    return response.data;
};

const TotalCustomers = async (year) => {
    const response = await axios.get(`${API_BASE_URL}/stat/customers`);
    return response.data;
};

export { AllCurrentProduct,GetSoldCategory,TotalOrders,TotalValue,TotalCustomers };