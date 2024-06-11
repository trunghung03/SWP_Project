import axios from 'axios';

const API_URL = 'https://localhost:7184/api/articles';

export const getAllArticles = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};
