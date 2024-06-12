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

export const searchArticlesByTitle = async (title) => {
    try {
        const response = await axios.get(`${API_URL}/${title}`);
        return response.data;
    } catch (error) {
        console.error('Error searching articles by title:', error);
        throw error;
    }
};
