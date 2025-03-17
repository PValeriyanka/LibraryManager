import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../../services/users';
import '../../styles/App.css';

function UpdateUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        role: 'User',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getUserById(id);
                setUser(data);
            } catch (error) {
                console.error('Failed to retrieve user:', error);
            }
        };
        loadUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(user.userId, user);
            navigate('/users');
        } catch (error) {
            console.error('Failed to update user:', error);
            setErrors({ submit: 'Failed to save changes. Please try again.' });
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
            <h1>Edit User</h1>
            <br></br>
            <br></br>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="userName" className="form-label">Username</label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        id="userName"
                                        name="userName"
                                        value={user.userName}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="email" className="form-label">Email</label>
                                </td>
                                <td>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="role" className="form-label">Role</label>
                                </td>
                                <td>
                                    <select
                                        id="role"
                                        name="role"
                                        value={user.role}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="User">User</option>
                                        <option value="Administrator">Administrator</option>
                                    </select>
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

export default UpdateUserPage;