import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllUsers } from '../../services/users';
import '../../styles/App.css';

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [metaData, setMetaData] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadUsers();
        checkUserRole();
    }, [pageNumber, pageSize]);

    const loadUsers = async () => {
        const { data, metaData } = await fetchAllUsers({
            PageNumber: pageNumber,
            PageSize: pageSize,
        });
        setUsers(data);
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

    if (!users) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="page">
            <h1>Users</h1>
            <br></br>
            <br></br>
            <div className="table-header-container">
                <div className="create-item-container">
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
            {users.length === 0 && isAdmin ? (<p className="loading">Your search did not match any results</p>) : (<table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.userId}>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <div>
                                    <Link to={`/users/${user.userId}`} className="action-link">
                                        Details
                                    </Link>
                                </div>
                                <div>
                                    <Link to={`/users/update/${user.userId}`} className="action-link">
                                        Edit
                                    </Link>
                                </div>
                                <div>
                                    <Link to={`/users/delete/${user.userId}`} className="action-link delete">
                                        Delete
                                    </Link>
                                </div>
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

export default UsersPage;