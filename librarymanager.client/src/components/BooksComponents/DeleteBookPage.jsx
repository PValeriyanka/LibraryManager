import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookById, deleteBook } from '../../services/books';
import '../../styles/App.css';

function DeleteBookPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const loadBook = async () => {
            try {
                const data = await getBookById(id);
                setBook(data);
            } catch (error) {
                console.error("Failed to fetch book:", error);
            }
        };
        loadBook();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteBook(id);
            navigate('/books');
        } catch (error) {
            console.error("Failed to delete book:", error);
        }
    };

    const handleCancel = () => {
        navigate('/books');
    };

    if (!book) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="page">
            <h1>Are you sure you want to delete this?</h1>
            <br></br>
            <br></br>
            <div className="form-container">
                <div className="form">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <td>{book.title}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <form onSubmit={handleDelete}>
                        <button type="submit" className="delete-button">
                            Delete
                        </button>
                        <button type="button" onClick={handleCancel} className="cancel-button">
                            Back to list
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteBookPage;