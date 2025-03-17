import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import './styles/App.css';

import AuthorsPage from './components/AuthorsComponents/AuthorsPage';
import AuthorDetailsPage from './components/AuthorsComponents/AuthorDetailsPage';
import CreateAuthorPage from './components/AuthorsComponents/CreateAuthorPage';
import UpdateAuthorPage from './components/AuthorsComponents/UpdateAuthorPage';
import DeleteAuthorPage from './components/AuthorsComponents/DeleteAuthorPage';

import BooksPage from './components/BooksComponents/BooksPage';
import BookDetailsPage from './components/BooksComponents/BookDetailsPage';
import CreateBookPage from './components/BooksComponents/CreateBookPage';
import UpdateBookPage from './components/BooksComponents/UpdateBookPage';
import DeleteBookPage from './components/BooksComponents/DeleteBookPage';

import BorrowedBooksPage from './components/BorrowedBooksComponents/BorrowedBooksPage';
import BorrowedBookDetailsPage from './components/BorrowedBooksComponents/BorrowedBookDetailsPage';
import CreateBorrowedBookPage from './components/BorrowedBooksComponents/CreateBorrowedBookPage';
import DeleteBorrowedBookPage from './components/BorrowedBooksComponents/DeleteBorrowedBookPage';

import GenresPage from './components/GenresComponents/GenresPage';
import GenreDetailsPage from './components/GenresComponents/GenreDetailsPage';
import CreateGenrePage from './components/GenresComponents/CreateGenrePage';
import UpdateGenrePage from './components/GenresComponents/UpdateGenrePage';
import DeleteGenrePage from './components/GenresComponents/DeleteGenrePage';

import RegistrationPage from './components/UsersComponents/RegistrationPage';
import LoginPage from './components/UsersComponents/LoginPage';
import UsersPage from './components/UsersComponents/UsersPage';
import UserDetailsPage from './components/UsersComponents/UserDetailsPage';
import UpdateUserPage from './components/UsersComponents/UpdateUserPage';
import DeleteUserPage from './components/UsersComponents/DeleteUserPage';

import './components/axiosSetup';
import { Provider } from "./utils/provider";

const App = () => {
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [username, setUsername] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleBeforeUnload = () => {
            logout();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const checkAuthentication = () => {
            const token = localStorage.getItem('accessToken');
            const userRole = localStorage.getItem('userRole');

            if (token) {
                const payload = parseJwt(token);
                setIsUserSignedIn(true);
                let userName = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                if (localStorage.getItem('username')) {
                    userName = localStorage.getItem('username');
                }
                setUsername(userName);
                setIsUserAdmin(userRole === 'Administrator');
            }
        };

        checkAuthentication();
    }, [location.pathname]);

    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        setIsUserSignedIn(false);
        setIsUserAdmin(false);
        setUsername('');
        navigate('/');
    };

    return (
        <Provider>
            <div>
                <header className="header">
                    <nav className="navbar">
                        <div className="container">
                            <a className="navbar-brand" href="/">Library Manager</a>
                            <div className="navbar-links">
                                <ul className="nav-links">
                                    <li><Link to="/books" className="btn">Books</Link></li>
                                    <li><Link to="/authors" className="btn">Authors</Link></li>
                                    <li><Link to="/genres" className="btn">Genres</Link></li>
                                    {isUserSignedIn && <li><Link to="/borrowedBooks" className="btn">Borrowed Books</Link></li>}
                                    {isUserAdmin && <li><Link to="/users" className="btn">Users</Link></li>}
                                </ul>
                                <div className="auth-links">
                                    {!isUserSignedIn ? (
                                        <>
                                            <Link to="/login" className="auth-link">Login</Link>
                                            <Link to="/authentication" className="auth-link">Register</Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/profile" className="auth-link">User: {username}</Link>
                                            <button onClick={logout} className="auth-link logout-button">Logout</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

                <main className="main-content">
                    <Routes>
                        <Route path="/authors" element={<AuthorsPage />} />
                        <Route path="/authors/:id" element={<AuthorDetailsPage />} />
                        <Route path="/authors/create" element={<CreateAuthorPage />} />
                        <Route path="/authors/update/:id" element={<UpdateAuthorPage />} />
                        <Route path="/authors/delete/:id" element={<DeleteAuthorPage />} />

                        <Route path="/books" element={<BooksPage />} />
                        <Route path="/books/:id" element={<BookDetailsPage />} />
                        <Route path="/books/create" element={<CreateBookPage />} />
                        <Route path="/books/update/:id" element={<UpdateBookPage />} />
                        <Route path="/books/delete/:id" element={<DeleteBookPage />} />

                        <Route path="/borrowedBooks" element={<BorrowedBooksPage />} />
                        <Route path="/borrowedBooks/:id" element={<BorrowedBookDetailsPage />} />
                        <Route path="/borrowedBooks/create/:bookId/:bookTitle" element={<CreateBorrowedBookPage />} />
                        <Route path="/borrowedBooks/delete/:id/:bookTitle" element={<DeleteBorrowedBookPage />} />

                        <Route path="/genres" element={<GenresPage />} />
                        <Route path="/genres/:id" element={<GenreDetailsPage />} />
                        <Route path="/genres/create" element={<CreateGenrePage />} />
                        <Route path="/genres/update/:id" element={<UpdateGenrePage />} />
                        <Route path="/genres/delete/:id" element={<DeleteGenrePage />} />

                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/authentication" element={<RegistrationPage />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/users/:id" element={<UserDetailsPage />} />
                        <Route path="/users/update/:id" element={<UpdateUserPage />} />
                        <Route path="/users/delete/:id" element={<DeleteUserPage />} />

                        <Route path="/" element={<div><p className="loading">Welcome to the Library!</p></div>} />
                    </Routes>
                </main>
            </div>
        </Provider>
    );
}

export default App; 