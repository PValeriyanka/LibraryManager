import axios from 'axios';

export const fetchAllAuthors = async (params) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get("/api/authors", {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const metaDataHeader = response.headers['x-pagination'];
        const metaData = metaDataHeader ? JSON.parse(metaDataHeader) : null;

        const authors = response.data.$values || [];  

        return {
            data: authors, 
            metaData,
        };
    } catch (error) {
        console.error("Error fetching authors:", error);
        return { data: [], metaData: null };
    }
};

export const fetchAuthors = async () => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get("/api/authors/withoutmeta", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const authors = response.data.$values || [];

        return authors;
    } catch (error) {
        console.error("Error fetching all authors:", error);
        return { data: [], metaData: null };
    }
};

export const getAuthorById = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/authors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching author:", error);
        throw new Error("Failed to fetch author");
    }
};

export const createAuthor = async (author) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post('/api/authors', author, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const updateAuthor = async (id, author) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`/api/authors/${id}`, author, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteAuthor = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');

        await axios.delete(`/api/authors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error deleting author:", error);
        throw new Error("Failed to delete author");
    }
};