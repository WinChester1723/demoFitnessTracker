import axios from 'axios';

const API_URL = 'https://fitness-tracker-app.azurewebsites.net/';

export const getUserData = async () => {
    try{
        const response = await axios.get(`${API_URL}/user`);
        return response.data;
    } catch (error) { 
        console.error('API error:', error)
        throw error;
    }
};