import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuthorById } from '../../services/authors';
import '../../styles/App.css';

function AuthorDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const loadAuthor = async () => {
            try {
                const data = await getAuthorById(id);
                setAuthor(data);
            } catch (error) {
                console.error('Failed to fetch author:', error);
            }
        };
        loadAuthor();
    }, [id]);

    if (!author) {
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
                                <td>{author.authorId}</td>
                            </tr>
                            <tr>
                                <th>Author</th>
                                <td>{author.firstName} {author.surname}</td>
                            </tr>
                            <tr>
                                <th>Date of Birth</th>
                                <td>{author.birthDate ? new Date(author.birthDate).toLocaleDateString() : ''}</td>
                            </tr>
                            <tr>
                                <th>Country of Origin</th>
                                <td>{author.country}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <div>
                        <button type="button" onClick={() => navigate('/authors')}>
                            Back to list
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AuthorDetailsPage;