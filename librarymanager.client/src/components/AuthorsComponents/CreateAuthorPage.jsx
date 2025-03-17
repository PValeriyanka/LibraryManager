import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAuthor } from '../../services/authors';
import '../../styles/App.css';

function CreateAuthorPage() {
    const navigate = useNavigate();
    const [author, setAuthor] = useState({
        firstName: '',
        surname: '',
        birthDate: '',
        country: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthor({
            ...author,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAuthor(author);
            navigate('/authors');
        } catch (error) {
            console.error('Failed to create author:', error);
            setErrors({ submit: 'Error creating author. Please try again.' });
        }
    };

    if (!author) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="page">
            <h1>Create author</h1>
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
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={author.firstName}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="surname">Surname</label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        id="surname"
                                        name="surname"
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
                                        type="date"
                                        id="birthDate"
                                        name="birthDate"
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
                                        type="text"
                                        id="country"
                                        name="country"
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
                        <button type="submit">Create</button>
                        <button type="button" onClick={() => navigate('/authors')}>
                            Back to list
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateAuthorPage;