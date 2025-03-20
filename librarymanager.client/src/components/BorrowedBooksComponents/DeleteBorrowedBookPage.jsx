import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBorrowedBook } from '../../services/borrowedBooks';
import '../../styles/App.css'; 

function DeleteBorrowedBookPage() {
    const { id, bookTitle } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
    }, [id]);


    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteBorrowedBook(id);
            navigate('/borrowedBooks');
        } catch (error) {
            console.error("Failed to delete borrowed book record:", error);
        }
    };

    const handleCancel = () => {
        navigate('/borrowedBooks');
    };

    return (
        <div className="page">
            <h1>Are you sure you want to return this book?</h1>
            <br></br>
            <br></br>
            <div className="form-container">
                <div className="form">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Book</th>
                                <td>{bookTitle}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <form onSubmit={handleDelete}>
                        <button type="submit" className="delete-button">
                            Return
                        </button>
                        <button type="button" onClick={handleCancel} className="cancel-button">
                            Back to List
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteBorrowedBookPage;