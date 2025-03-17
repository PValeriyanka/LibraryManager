import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBorrowedBookById, updateBorrowedBook } from '../../services/borrowedBooks';
import { fetchBooks } from '../../services/books';
import { fetchUsers } from '../../services/users';
import '../../styles/App.css';

function UpdateBorrowedBookPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [borrowedBook, setBorrowedBook] = useState({
        bookId: '',
        userId: '',
        borrowedDate: '',
        dueDate: '',
    });
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadBorrowedBookAndData = async () => {
            try {
                const borrowedBookData = await getBorrowedBookById(id);
                setBorrowedBook({
                    ...borrowedBookData,
                    borrowedDate: borrowedBookData.borrowedDate ? new Date(borrowedBookData.borrowedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                    dueDate: borrowedBookData.dueDate ? new Date(borrowedBookData.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                });
                const booksData = await fetchBooks();
                const usersData = await fetchUsers();
                setBooks(booksData);
                setUsers(usersData);
            } catch (error) {
                console.error('Failed to retrieve borrowed book, books, or users:', error);
            }
        };
        loadBorrowedBookAndData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBorrowedBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBorrowedBook(borrowedBook.borrowId, borrowedBook);
            navigate('/borrowedBooks');
        } catch (error) {
            console.error('Failed to update the borrow record:', error);
            setErrors({ submit: 'Failed to save changes. Please try again.' });
        }
    };

    const handleCancel = () => {
        navigate('/borrowedBooks');
    };

    if (!borrowedBook) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="page">
            <h1>Edit Borrowed Book</h1>
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
                                    <select
                                        id="bookId"
                                        name="bookId"
                                        value={borrowedBook.bookId}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="">Select a book</option>
                                        {books.map((book) => (
                                            <option key={book.bookId} value={book.bookId}>
                                                {book.title}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="userId" className="form-label">User</label>
                                </td>
                                <td>
                                    <select
                                        id="userId"
                                        name="userId"
                                        value={borrowedBook.userId}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="">Select a user</option>
                                        {users.map((user) => (
                                            <option key={user.userId} value={user.userId}>
                                                {user.userName}
                                            </option>
                                        ))}
                                    </select>
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
                    <div className="button-container">
                        <button type="submit" className="submit-button">
                            Save
                        </button>
                        <button type="button" onClick={handleCancel} className="cancel-button">
                            Back to List
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateBorrowedBookPage;