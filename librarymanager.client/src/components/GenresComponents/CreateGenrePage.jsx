import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGenre } from '../../services/genres';
import '../../styles/App.css';

function CreateGenrePage() {
    const navigate = useNavigate();
    const [genre, setGenre] = useState({ genreName: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGenre({ ...genre, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createGenre(genre);
            navigate('/genres');
        } catch (error) {
            console.error('Failed to create genre:', error);
            setErrors({ submit: 'Error creating genre. Please try again.' });
        }
    };

    if (!genre) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="page">
            <h1>Create genre</h1>
            <br></br>
            <br></br>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="genreName" className="form-label">
                                        Genre Name
                                    </label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        id="genreName"
                                        name="genreName"
                                        value={genre.genreName}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="genreDescription">Description</label></td>
                                <td>
                                    <textarea
                                        id="genreDescription"
                                        name="genreDescription"
                                        value={genre.genreDescription}
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
                            Create
                        </button>
                        <button type="button" onClick={() => navigate('/genres')} className="cancel-button">
                            Back to List
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateGenrePage;