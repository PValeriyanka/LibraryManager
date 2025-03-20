import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;  
export const fetchAllUsers = async (params) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get(`${apiUrl}/api/users`, {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const metaDataHeader = response.headers['x-pagination'];
        const metaData = metaDataHeader ? JSON.parse(metaDataHeader) : null;

        const users = response.data.$values || [];

        return {
            data: users,
            metaData,
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { data: [], metaData: null };
    }
};

export const fetchUsers = async () => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get(`${apiUrl}/api/users/withoutmeta`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const users = response.data.$values || [];

        return users;
    } catch (error) {
        console.error("Error fetching all users:", error);
        return { data: [], metaData: null };
    }
};

export const getUserById = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${apiUrl}/api/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Failed to fetch user");
    }
};

export const createUser = async (user) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`${apiUrl}/api/users`, user, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const updateUser = async (id, user) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`${apiUrl}/api/users/${id}`, user, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteUser = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');

        await axios.delete(`${apiUrl}/api/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user");
    }
};
