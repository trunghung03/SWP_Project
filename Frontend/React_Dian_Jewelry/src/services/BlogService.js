import axios from 'axios';

// const API_URL = 'https://localhost:7184/api/articles';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const getAllArticles = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/articles`);
        return response.data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};

export const searchArticlesByTitle = async (title) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/articles/${title}`);
        return response.data;
    } catch (error) {
        console.error('Error searching articles by title:', error);
        throw error;
    }
};

export const getArticleById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching article by ID:', error);
        throw error;
    }
};
