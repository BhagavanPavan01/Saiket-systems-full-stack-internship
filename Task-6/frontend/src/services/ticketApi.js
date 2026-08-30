import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tickets/';

// Get config with token
const getAuthHeaders = () => {
    const token = localStorage.getItem('userToken');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const getTickets = async () => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data.data;
};

export const createTicket = async (ticketData) => {
    const response = await axios.post(API_URL, ticketData, getAuthHeaders());
    return response.data.data;
};

export const updateTicket = async (id, ticketData) => {
    const response = await axios.put(API_URL + id, ticketData, getAuthHeaders());
    return response.data.data;
};

export const deleteTicket = async (id) => {
    const response = await axios.delete(API_URL + id, getAuthHeaders());
    return response.data;
};
