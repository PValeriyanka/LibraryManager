import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../../services/books';
import { getAuthorById } from '../../services/authors';
import { getGenreById } from '../../services/genres';
import '../../styles/App.css';

function BookDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const loadBook = async () => {
            try {
                const data = await getBookById(id);
                if (data.authorId) {
                    const author = await getAuthorById(data.authorId);
                    data.author = author;
                }
                if (data.genreId) {
                    const genre = await getGenreById(data.genreId);
                    data.genre = genre;
                }
                setBook(data);
            } catch (error) {
                console.error('Failed to fetch book:', error);
            }
        };
        loadBook();
    }, [id]);

    const getCoverImage = (imageName) => {
        return `/images/${imageName}`;
    };

    const handleImageError = (e) => {
        e.target.src = '/images/default-cover.jpg';
    };

    if (!book) {
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
                                <td>{book.bookId}</td>
                            </tr>
                            <tr>
                                <th>Cover</th>
                                <td>
                                    <img
                                        src={getCoverImage(book.coverImage)}
                                        alt={book.title}
                                        className="book-cover"
                                        onError={handleImageError}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>ISBN</th>
                                <td>{book.isbn}</td>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <td>{book.title}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{book.description}</td>
                            </tr>
                            <tr>
                                <th>Author</th>
                                <td>{book.author?.firstName} {book.author?.surname}</td>
                            </tr>
                            <tr>
                                <th>Genre</th>
                                <td>{book.genre?.genreName}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <div>
                        <button type="button" onClick={() => navigate('/books')}>
                            Back to list
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookDetailsPage;