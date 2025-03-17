import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGenreById } from '../../services/genres';
import '../../styles/App.css';

function GenreDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const loadGenre = async () => {
            try {
                const data = await getGenreById(id);
                setGenre(data);
            } catch (error) {
                console.error('Failed to fetch genre:', error);
            }
        };
        loadGenre();
    }, [id]);

    if (!genre) {
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
                                <td>{genre.genreId}</td>
                            </tr>
                            <tr>
                                <th>Genre Name</th>
                                <td>{genre.genreName}</td>
                            </tr>
                            <tr>
                                <th>Desctiption</th>
                                <td>{genre.genreDescription}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <div>
                        <button type="button" onClick={() => navigate('/genres')}>
                            Back to list
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default GenreDetailsPage;