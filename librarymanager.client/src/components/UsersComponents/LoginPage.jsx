import React, { useState, useEffect } from 'react';
import { loginPost } from '../../services/loginPost';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../../services/loginPost'; 
import '../../styles/App.css';

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        setLoginError('');
        setPasswordError('');
        setGeneralError('');

        let valid = true;

        if (!login) {
            setLoginError('Username is required');
            valid = false;
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        }

        if (valid) {
            const params = { email: login, password: password };
            const { accessToken, refreshToken: newRefreshToken } = await loginPost(params);

            if (accessToken && newRefreshToken) {

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                localStorage.setItem('userName', params.email);

                const payload = parseJwt(accessToken);
                const userRole = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || 'User';
                localStorage.setItem('userRole', userRole);

                navigate('/'); 
            } else {
                setGeneralError('Invalid username or password');
            }
        }
    };

    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Invalid token", e);
            return null;
        }
    };

    const checkAndRefreshToken = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshTokenValue = localStorage.getItem('refreshToken');

        if (!accessToken || !refreshTokenValue) return;

        const payload = parseJwt(accessToken);
        const expiry = payload.exp * 1000;
        const now = Date.now();

        if (expiry < now) {
            console.log("Access token expired. Trying to refresh.");
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshToken(refreshTokenValue);

            if (newAccessToken && newRefreshToken) {
                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                console.log("Token refreshed successfully.");
            } else {
                console.error("Failed to refresh token.");
                navigate('/login');
            }
        }
    };


    useEffect(() => {
        checkAndRefreshToken();
    }, []);

    return (
        <div className="page">
            <h1>Login</h1>
            <section>
                <form id="form" onSubmit={handleLoginSubmit}>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td><label htmlFor="login">Email</label></td>
                                <td>
                                    <input
                                        id="login"
                                        name="login"
                                        type="text"
                                        className="form-control"
                                        value={login}
                                        onChange={(e) => setLogin(e.target.value)}
                                        required
                                    />
                                    {loginError && <span className="text-danger"> Invalid login!</span>}
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="password">Password</label></td>
                                <td>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {passwordError && <span className="text-danger"> Invalid password!</span>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <div className="form-group">
                        <button type="submit" id="login-button" className="btn btn-primary">
                            Log In
                        </button>
                    </div>
                </form>
                {generalError && <div className="text-danger">There was an error logging in!</div>}
            </section>
        </div>
    );
};

export default LoginPage;
