import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGenreById, updateGenre } from '../../services/genres';
import '../../styles/App.css';

function UpdateGenrePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genre, setGenre] = useState({ genreName: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadGenre = async () => {
            try {
                const data = await getGenreById(id);
                setGenre(data);
            } catch (error) {
                console.error('Failed to retrieve genre:', error);
            }
        };
        loadGenre();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGenre({ ...genre, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateGenre(genre.genreId, genre);
            navigate('/genres');
        } catch (error) {
            console.error('Failed to update genre:', error);
            setErrors({ submit: 'Failed to save changes. Please try again.' });
        }
    };

    const handleCancel = () => {
        navigate('/genres');
    };

    if (!genre) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="page">
            <h1>Edit genre</h1>
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
                                <td>
                                    <label htmlFor="genreDescription" className="form-label">
                                        Description
                                    </label>
                                </td>
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

export default UpdateGenrePage;