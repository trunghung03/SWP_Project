import axios from 'axios';

const API_BASE_URL = 'https://pricingservice-z16l.onrender.com';

const getDiamondPrice = (cut, carat, clarity, color) => {
  const data = {
    cut: cut,
    carat: parseFloat(carat),
    clarity: clarity,
    color: color
  };

  return axios.post(`${API_BASE_URL}/diamond_price/`, data);
};

export { getDiamondPrice };
