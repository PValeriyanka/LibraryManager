import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../../services/books';
import { fetchAuthors } from '../../services/authors';
import { fetchGenres } from '../../services/genres';
import '../../styles/App.css';

function CreateBookPage() {
    const navigate = useNavigate();
    const [book, setBook] = useState({
        isbn: '',
        title: '',
        description: '',
        coverImage: '',
        genreId: '',
        authorId: '',
    });
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadAuthorsAndGenres = async () => {
            try {
                const authorsData = await fetchAuthors();
                const genresData = await fetchGenres();
                setAuthors(authorsData);
                setGenres(genresData);
            } catch (error) {
                console.error('Failed to fetch authors or genres:', error);
                setErrors({ submit: 'Error creating author. Please try again.' });
            }
        };
        loadAuthorsAndGenres();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBook(book);
            navigate('/books');
        } catch (error) {
            console.error('Failed to create book:', error);
            setErrors({ submit: 'Error creating book. Please try again.' });
        }
    };

    if (!book) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="page">
            <h1>Create book</h1>
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
                                        type="text"
                                        id="isbn"
                                        name="isbn"
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
                                        type="text"
                                        id="title"
                                        name="title"
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
                            Create
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/books')}
                            className="cancel-button"
                        >
                            Back to list
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateBookPage;