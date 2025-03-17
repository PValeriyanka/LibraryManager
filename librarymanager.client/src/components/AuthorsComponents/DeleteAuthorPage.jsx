import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthorById, deleteAuthor } from '../../services/authors';
import '../../styles/App.css';

function DeleteAuthorPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const loadAuthor = async () => {
            try {
                const data = await getAuthorById(id);
                setAuthor(data);
            } catch (error) {
                console.error("Failed to fetch author:", error);
            }
        };
        loadAuthor();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteAuthor(id);
            navigate('/authors');
        } catch (error) {
            console.error("Failed to delete author:", error);
        }
    };

    const handleCancel = () => {
        navigate('/authors');
    };

    if (!author) {
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
                                <th>Author</th>
                                <td>{author.firstName} {author.surname}</td>
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

export default DeleteAuthorPage;