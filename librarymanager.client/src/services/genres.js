import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;  

export const fetchAllGenres = async (params) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get(`${apiUrl}/api/genres`, {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const metaDataHeader = response.headers['x-pagination'];
        const metaData = metaDataHeader ? JSON.parse(metaDataHeader) : null;

        const genres = response.data.$values || [];

        return {
            data: genres,
            metaData,
        };
    } catch (error) {
        console.error("Error fetching books:", error);
        return { data: [], metaData: null };
    }
};

export const fetchGenres = async () => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get(`${apiUrl}/api/genres/withoutmeta`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const genres = response.data.$values || [];

        return genres;
    } catch (error) {
        console.error("Error fetching all genres:", error);
        return { data: [], metaData: null };
    }
};

export const getGenreById = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${apiUrl}/api/genres/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        console.error("Error fetching genre:", error);
        throw new Error("Failed to fetch genre");
    }
};

export const createGenre = async (genre) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`${apiUrl}/api/genres`, genre, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const updateGenre = async (id, genre) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`${apiUrl}/api/genres/${id}`, genre, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteGenre = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');

        await axios.delete(`${apiUrl}/api/genres/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error deleting genre:", error);
        throw new Error("Failed to delete genre");
    }
};
