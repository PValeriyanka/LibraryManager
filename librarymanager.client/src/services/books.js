import axios from 'axios';

export const fetchAllBooks = async (params) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get("/api/books", {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const metaDataHeader = response.headers['x-pagination'];
        const metaData = metaDataHeader ? JSON.parse(metaDataHeader) : null;

        const books = response.data.$values || [];  

        return {
            data: books,
            metaData,
        };
    } catch (error) {
        console.error("Error fetching books:", error);
        return { data: [], metaData: null };
    }
};

export const fetchBooks = async () => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get("/api/books/withoutmeta", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const books = response.data.$values || [];

        return books;
    } catch (error) {
        console.error("Error fetching all books:", error);
        return { data: [], metaData: null };
    }
};

export const getBookById = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/books/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching book:", error);
        throw new Error("Failed to fetch book");
    }
};

export const deleteBook = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');

        await axios.delete(`/api/books/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error deleting book:", error);
        throw new Error("Failed to delete book");
    }
};


export const updateBook = async (id, book) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`/api/books/${id}`, book, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const createBook = async (book) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post('/api/books', book, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};