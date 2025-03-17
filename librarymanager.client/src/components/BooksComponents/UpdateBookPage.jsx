import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../../services/books';
import { fetchAuthors, getAuthorById } from '../../services/authors';
import { fetchGenres, getGenreById } from '../../services/genres';
import '../../styles/App.css';

function UpdateBookPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        isbn: '',
        title: '',
        description: '',
        coverImage: '',
        genreId: '',
        authorId: ''
    });
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadBookAndAuthorsAndGenres = async () => {
            try {
                const book = await getBookById(id);
                if (book.authorId) {
                    const author = await getAuthorById(book.authorId);
                    book.author = author;
                }
                if (book.genreId) {
                    const genre = await getGenreById(book.genreId);
                    book.genre = genre;
                }
                setBook(book);
                const authors = await fetchAuthors();
                const genres = await fetchGenres();
                setAuthors(authors);
                setGenres(genres);
            } catch (error) {
                console.error('Failed to fetch book, authors, or genres:', error);
            }
        };
        loadBookAndAuthorsAndGenres();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBook(book.bookId, book);
            navigate('/books');
        } catch (error) {
            console.error('Failed to update book:', error);
            setErrors({ submit: 'Failed to save changes. Please try again.' });
        }
    };

    const handleCancel = () => {
        navigate('/books');
    };

    if (!book) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="page">
            <h1>Edit book</h1>
            <br></br>
            <br></br>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td><label htmlFor="coverImage">Cover (URL)</label></td>
                                <td>
                                    <input
                                        type="text"
                                        id="coverImage"
                                        name="coverImage"
                                        value={book.coverImage}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="isbn">ISBN</label></td>
                                <td>
                                    <input
                                        id="isbn"
                                        name="isbn"
                                        type="text"
                                        value={book.isbn}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="title">Title</label></td>
                                <td>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        value={book.title}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="description">Description</label></td>
                                <td>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={book.description}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="authorId">Author</label></td>
                                <td>
                                    <select
                                        id="authorId"
                                        name="authorId"
                                        value={book.authorId}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="">Select Author</option>
                                        {authors.map((author) => (
                                            <option key={author.authorId} value={author.authorId}>
                                                {author.firstName} {author.surname}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="genreId">Genre</label></td>
                                <td>
                                    <select
                                        id="genreId"
                                        name="genreId"
                                        value={book.genreId}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="">Select Genre</option>
                                        {genres.map((genre) => (
                                            <option key={genre.genreId} value={genre.genreId}>
                                                {genre.genreName}
                                            </option>
                                        ))}
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
                            Back to list
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateBookPage;