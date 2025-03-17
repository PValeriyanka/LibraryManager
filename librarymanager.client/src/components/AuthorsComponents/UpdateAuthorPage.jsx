import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthorById, updateAuthor } from '../../services/authors';
import '../../styles/App.css';

function UpdateAuthorPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [author, setAuthor] = useState({
        firstName: '',
        surname: '',
        birthDate: '',
        country: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadAuthor = async () => {
            try {
                const authorData = await getAuthorById(id);
                setAuthor({
                    ...authorData,
                    birthDate: authorData.birthDate ? new Date(authorData.birthDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                });
            } catch (error) {
                console.error('Failed to fetch author:', error);
            }
        };
        loadAuthor();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthor((prevAuthor) => ({
            ...prevAuthor,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAuthor(author.authorId, author);
            navigate('/authors');
        } catch (error) {
            console.error('Failed to update author:', error);
            setErrors({ submit: 'Failed to save changes. Please try again.' });
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
            <h1>Edit author</h1>
            <br></br>
            <br></br>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="firstName">First Name</label>
                                </td>
                                <td>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={author.firstName}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="surname">Surname</label>
                                </td>
                                <td>
                                    <input
                                        id="surname"
                                        name="surname"
                                        type="text"
                                        value={author.surname}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="birthDate">Date of Birth</label>
                                </td>
                                <td>
                                    <input
                                        id="birthDate"
                                        name="birthDate"
                                        type="date"
                                        value={author.birthDate}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="country">Country</label>
                                </td>
                                <td>
                                    <input
                                        id="country"
                                        name="country"
                                        type="text"
                                        value={author.country}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {errors.submit && (<div className="error-message">{errors.submit}</div>)}
                    <br></br>
                    <div>
                        <button type="submit">Save</button>
                        <button type="button" onClick={handleCancel}>
                            Back to list
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateAuthorPage;