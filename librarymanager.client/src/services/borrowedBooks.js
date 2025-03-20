import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL; 

export const fetchAllBorrowedBooks = async (params) => {
    try {
        const token = localStorage.getItem('accessToken');
        const username = localStorage.getItem('userName');

        const response = await axios.get(`${apiUrl}/api/borrowedBooks`, {
            params: {
                ...params,
                email: username,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const metaDataHeader = response.headers['x-pagination'];
        const metaData = metaDataHeader ? JSON.parse(metaDataHeader) : null;

        const borrowedBooks = response.data.$values || [];

        return {
            data: borrowedBooks,
            metaData,
        };
    } catch (error) {
        console.error("Error fetching books:", error);
        return { data: [], metaData: null };
    }
};

export const fetchBorrowedBooks = async () => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get(`${apiUrl}/api/borrowedBooks/withoutmeta`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const borrowedBooks = response.data.$values || [];

        return borrowedBooks;
    } catch (error) {
        console.error("Error fetching all books:", error);
        return { data: [], metaData: null };
    }
};

export const getBorrowedBookById = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${apiUrl}/api/borrowedBooks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        console.error("Error fetching borrowed book:", error);
        throw new Error("Failed to fetch borrowed book");
    }
};

export const createBorrowedBook = async (borrowedBook, userName) => {

    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`${apiUrl}/api/borrowedBooks`, borrowedBook, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            email: userName,
        }
    });
    return response.data;
};

export const updateBorrowedBook = async (id, borrowedBook) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`${apiUrl}/api/borrowedBooks/${id}`, borrowedBook, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteBorrowedBook = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');

        await axios.delete(`${apiUrl}/api/borrowedBooks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error deleting borrowed book:", error);
        throw new Error("Failed to delete borrowed book");
    }
};
