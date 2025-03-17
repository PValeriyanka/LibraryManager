import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBorrowedBookById } from '../../services/borrowedBooks';
import { getBookById } from '../../services/books';
import { getUserById } from '../../services/users';
import '../../styles/App.css';

function BorrowedBookDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [borrowedBook, setBorrowedBook] = useState(null);

    useEffect(() => {
        const loadBorrowedBook = async () => {
            try {
                const data = await getBorrowedBookById(id);
                if (data.bookId) {
                    const book = await getBookById(data.bookId);
                    data.book = book;
                }
                if (data.userId) {
                    const user = await getUserById(data.userId);
                    data.user = user;
                }
                setBorrowedBook(data);
            } catch (error) {
                console.error('Failed to fetch borrowed book data:', error);
            }
        };
        loadBorrowedBook();
    }, [id]);

    const isDueDatePassed = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        return due < today;  
    };

    if (!borrowedBook) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="page">
            <h1>Details</h1>
            <br></br>
            <br></br>
            <div className="form-container">
                <form>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{borrowedBook.borrowId}</td>
                            </tr>
                            <tr>
                                <th>Book</th>
                                <td>{borrowedBook.book?.title}</td>
                            </tr>
                            <tr>
                                <th>User</th>
                                <td>{borrowedBook.user?.userName}</td>
                            </tr>
                            <tr>
                                <th>Borrowed Date</th>
                                <td>{new Date(borrowedBook.borrowedDate).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <th>Due Date</th>
                                <td
                                    style={{
                                        color: isDueDatePassed(borrowedBook.dueDate) ? 'red' : 'black',
                                    }}
                                >
                                    {new Date(borrowedBook.dueDate).toLocaleDateString()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <div>
                        <button type="button" onClick={() => navigate('/borrowedBooks')}>
                            Back to list
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BorrowedBookDetailsPage;