import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGenreById, deleteGenre } from '../../services/genres';
import '../../styles/App.css'; // Import the styles file

function DeleteGenrePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const loadGenre = async () => {
            try {
                const data = await getGenreById(id);
                setGenre(data);
            } catch (error) {
                console.error("Failed to fetch genre:", error);
            }
        };
        loadGenre();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteGenre(id);
            navigate('/genres');
        } catch (error) {
            console.error("Failed to delete genre:", error);
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
            <h1>Are you sure you want to delete this?</h1>
            <br></br>
            <br></br>
            <div className="form-container">
                <div className="form">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Genre Name</th>
                                <td>{genre.genreName}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <form onSubmit={handleDelete}>
                        <button type="submit" className="delete-button">
                            Delete
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

export default DeleteGenrePage;