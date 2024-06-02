import axios from 'axios';

const API_BASE_URL = 'https://localhost:7184/api';

const ShowCartItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/diamonds/all`);
  return response.data;
};

const getDiamondDetail = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/diamonds/${id}`);
  return response.data;
};

export { ShowCartItems, getDiamondDetail };
