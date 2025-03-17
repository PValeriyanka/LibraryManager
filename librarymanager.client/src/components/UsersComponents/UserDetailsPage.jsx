import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../../services/users';
import '../../styles/App.css';

function UserDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getUserById(id);
                setUser(data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };
        loadUser();
    }, [id]);

    if (!user) {
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
                                <td>{user.userId}</td>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <td>{user.userName}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>Role</th>
                                <td>{user.role}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <div>
                        <button type="button" onClick={() => navigate('/users')}>
                            Back to list
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserDetailsPage;