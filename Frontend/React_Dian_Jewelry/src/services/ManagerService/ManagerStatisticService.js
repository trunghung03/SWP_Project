import axios from "axios";
const API_BASE_URL = 'https://localhost:7184/api';
const AllCurrentProduct = async () => {
    const response = await axios.get(`${API_BASE_URL}/stat/products`);
    return response.data;
};

const GetSoldCategory = async (startMonth,endMonth) => {
    const response = await axios.get(`${API_BASE_URL}/stat/products/soldpercentage?startMonthYear=${startMonth}&endMonthYear=${endMonth}`);
    return response.data;
};

const TotalOrders = async (year) => {
    const response = await axios.get(`${API_BASE_URL}/stat/monthlyPurchaseOrderCount?${year}`);
    return response.data;
};
export { AllCurrentProduct,GetSoldCategory,TotalOrders };