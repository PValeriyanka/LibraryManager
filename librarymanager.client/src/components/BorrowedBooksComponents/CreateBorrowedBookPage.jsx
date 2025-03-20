import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBorrowedBook } from '../../services/borrowedBooks';
import '../../styles/App.css';

function CreateBorrowedBookPage() {
    const navigate = useNavigate();
    const { bookId, bookTitle } = useParams();
    const [borrowedBook, setBorrowedBook] = useState({
        bookId: bookId,
        userId: '',
        borrowedDate: '',
        dueDate: '',
    });
    const [errors, setErrors] = useState({});
    const [userName, setName] = useState()

    useEffect(() => {
        
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const user = localStorage.getItem('userName'); 
            setName(user);

        } catch (error) {
            console.error('Failed to fetch books or users:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBorrowedBook({
            ...borrowedBook,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedBorrowedDate = new Date(borrowedBook.borrowedDate).toISOString().split('T')[0];
        const formattedDueDate = new Date(borrowedBook.dueDate).toISOString().split('T')[0];
        
        const bookToSubmit = {
            ...borrowedBook,
            userId: '1',
            borrowedDate: formattedBorrowedDate,
            dueDate: formattedDueDate,
        };
        try {
            await createBorrowedBook(bookToSubmit, userName);
            navigate('/books');
        } catch (error) {
            console.error('Failed to create borrow record:', error);
            setErrors({ submit: 'Error creating borrow record. Please try again.' });
        }
    };

    if (!borrowedBook) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="page">
            <h1>Create borrow book</h1>
            <br></br>
            <br></br>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="bookId" className="form-label">Book</label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={bookTitle}
                                        readOnly
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="borrowedDate" className="form-label">Borrowed Date</label>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        id="borrowedDate"
                                        name="borrowedDate"
                                        value={borrowedBook.borrowedDate}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        value={borrowedBook.dueDate}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {errors.submit && (<div className="error-message">{errors.submit}</div>)}
                    <br></br>
                    <div>
                        <button type="submit" className="submit-button">
                            Get
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/books')}
                            className="cancel-button"
                        >
                            Back to List
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}

export default CreateBorrowedBookPage;