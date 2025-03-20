import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, deleteUser } from '../../services/users';
import '../../styles/App.css'; 

function DeleteUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getUserById(id);
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        loadUser();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteUser(id);
            navigate('/users');
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    const handleCancel = () => {
        navigate('/users');
    };

    if (!user) {
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
                                <th>Username</th>
                                <td>{user.userName}</td>
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

export default DeleteUserPage;