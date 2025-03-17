import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllGenres } from '../../services/genres';
import '../../styles/App.css';

function GenresPage() {
    const [genres, setGenres] = useState([]);
    const [metaData, setMetaData] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadGenres();
        checkUserRole();
    }, [pageNumber, pageSize]);

    const loadGenres = async () => {
        const { data, metaData } = await fetchAllGenres({
            PageNumber: pageNumber,
            PageSize: pageSize,
        });
        setGenres(data);
        setMetaData(metaData);
    };

    const checkUserRole = () => {
        const role = localStorage.getItem('userRole');
        setIsAdmin(role === 'Administrator');
    };

    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPageNumber(1);
    };

    if (!genres) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="page">
            <h1>Genres</h1>
            <br></br>
            <br></br>
            <div className="table-header-container">
                <div className="create-item-container">
                    {isAdmin && (
                        <Link to="/genres/create" className="create-item-link">
                            Create
                        </Link>
                    )}
                </div>
                <div className="page-size-container">
                    <label htmlFor="pageSize">Show per page:</label>
                    <select id="pageSize" value={pageSize} onChange={handlePageSizeChange} className="form-control">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>
            {genres.length === 0 ? (<p className="loading">Your search did not match any results</p>) : (<table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map((genre) => (
                        <tr key={genre.genreId}>
                            <td>{genre.genreName}</td>
                            <td>
                                <Link to={`/genres/${genre.genreId}`} className="action-link">
                                    Details
                                </Link>
                                {isAdmin && (
                                    <div>
                                        <div>
                                            <Link to={`/genres/update/${genre.genreId}`} className="action-link">
                                                Edit
                                            </Link>
                                        </div>
                                        <div>
                                            <Link to={`/genres/delete/${genre.genreId}`} className="action-link delete">
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            <br></br>
            { metaData && metaData.TotalPages > 0 && (
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(metaData.CurrentPage - 1)}
                        disabled={!metaData.HasPrevious}
                    >
                        &laquo; Previous
                    </button>
                    <span>
                        Page {metaData.CurrentPage} of {metaData.TotalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(metaData.CurrentPage + 1)}
                        disabled={!metaData.HasNext}
                    >
                        Next &raquo;
                    </button>
                </div>
            )}
        </div>
    );
}

export default GenresPage;