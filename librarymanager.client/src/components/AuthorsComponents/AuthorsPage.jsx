import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllAuthors } from '../../services/authors';
import '../../styles/App.css';

function AuthorsPage() {
    const [authors, setAuthors] = useState([]);
    const [metaData, setMetaData] = useState();
    const [searchById, setSearchById] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadAuthors();
        checkUserRole();
    }, [searchById, pageNumber, pageSize]);

    const loadAuthors = async () => {
        const { data, metaData } = await fetchAllAuthors({
            SearchById: searchById,
            PageNumber: pageNumber,
            PageSize: pageSize,
        });
        setAuthors(data);
        setMetaData(metaData);
    };

    const checkUserRole = () => {
        const role = localStorage.getItem('userRole');
        setIsAdmin(role === 'Administrator');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPageNumber(1);
        loadAuthors();
    };

    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    };

    const handleResetFilters = () => {
        setSearchById('');
        setPageNumber(1);
        loadAuthors();
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPageNumber(1);
        loadAuthors();
    };

    if (!authors) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="page">
            <h1>Authors</h1>
            <br></br>
            <br></br>
            <div className="table-header-container">
                <div className="create-item-container">
                    {isAdmin && (
                        <Link to="/authors/create" className="create-item-link">
                            Create
                        </Link>
                    )}
                </div>
                <form onSubmit={handleSearch} className="search-form">
                    <div>
                        <label htmlFor="searchId">Search by Id:</label>
                        <input
                            id="searchId"
                            type="text"
                            value={searchById}
                            onChange={(e) => setSearchById(e.target.value)}
                            placeholder="Enter author Id"
                        />
                    </div>
                    <div className="filter-actions">

                        <button
                            type="button"
                            onClick={handleResetFilters}
                            className="reset-filters-btn"
                        >
                            Reset Filters
                        </button>
                    </div>
                </form>
                <br></br>
                <div className="page-size-container">
                    <label htmlFor="pageSize">Show per page:</label>
                    <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>
            {authors.length === 0 ? (<p className="loading">Your search did not match any results</p>) : (<table className="table">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => (
                        <tr key={author.authorId}>
                            <td>{author.firstName} {author.surname}</td>
                            <td>
                                <Link to={`/authors/${author.authorId}`} className="action-link">
                                    Details
                                </Link>
                                {isAdmin && (
                                    <div>
                                        <div>
                                            <Link to={`/authors/update/${author.authorId}`} className="action-link">
                                                Edit
                                            </Link>
                                        </div>
                                        <div>
                                            <Link to={`/authors/delete/${author.authorId}`} className="action-link delete">
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

export default AuthorsPage;