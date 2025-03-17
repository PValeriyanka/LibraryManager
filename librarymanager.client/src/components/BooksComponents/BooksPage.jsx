import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllBooks } from '../../services/books';
import { getAuthorById, fetchAuthors } from '../../services/authors';
import { getGenreById, fetchGenres } from '../../services/genres';
import '../../styles/App.css';

function BooksPage() {
    const [books, setBooks] = useState([]);
    const [metaData, setMetaData] = useState();
    const [searchTitle, setSearchTitle] = useState('');
    const [searchISBN, setSearchISBN] = useState('');
    const [searchById, setSearchById] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        loadAuthorsAndGenres();
        loadBooks();
        //loadCurrentUser();
        checkUserRole();
    }, [searchTitle, searchById, searchISBN, selectedAuthor, selectedGenre, pageNumber, pageSize]);

    const checkUserRole = () => {
        const role = localStorage.getItem('userRole');
        setIsLogin(role != null)
        setIsAdmin(role === 'Administrator');
    };

    const loadAuthorsAndGenres = async () => {
        const authorsData = await fetchAuthors();
        const genresData = await fetchGenres();
        setAuthors(authorsData);
        setGenres(genresData);
    };

    const loadBooks = async () => {
        const { data, metaData } = await fetchAllBooks({
            SearchById: searchById,
            SearchByISBN: searchISBN,
            SearchByTitle: searchTitle,
            SearchByAuthor: selectedAuthor,
            SearchByGenre: selectedGenre,
            PageNumber: pageNumber,
            PageSize: pageSize,
        });

        for (let book of data) {
            if (book.authorId) {
                const author = await getAuthorById(book.authorId);
                book.author = author;
            }
            if (book.genreId) {
                const genre = await getGenreById(book.genreId);
                book.genre = genre;
            }
        }

        setBooks(data);
        setMetaData(metaData);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPageNumber(1);
        loadBooks();
    };

    const handleResetFilters = () => {
        setSearchTitle('');
        setSearchById('');
        setSearchISBN('');
        setSelectedAuthor('');
        setSelectedGenre('');
        setPageNumber(1);
        loadBooks();
    };

    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPageNumber(1);
    };


    const getCoverImage = (imageName) => {
        return `/images/${imageName}`;
    };

    const handleImageError = (e) => {
        e.target.src = '/images/default-cover.jpg';
    };

    if (!books) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="page">
            <h1>Books</h1>
            <br></br>
            <br></br>
            <div className="table-header-container">
                <div className="create-item-container">
                    {isAdmin && (
                        <Link to="/books/create" className="create-item-link">
                            Create
                        </Link>
                    )}
                </div>
                <form onSubmit={handleSearch} className="search-form">
                    <div className="filters-container">
                        <div className="filter-row">
                            <div>
                                <label htmlFor="searchId">Search by ID:</label>
                                <input
                                    id="searchId"
                                    type="text"
                                    value={searchById}
                                    onChange={(e) => setSearchById(e.target.value)}
                                    placeholder="Enter book ID"
                                />
                            </div>

                            <div>
                                <label htmlFor="searchISBN">Search by ISBN:</label>
                                <input
                                    id="searchISBN"
                                    type="text"
                                    value={searchISBN}
                                    onChange={(e) => setSearchISBN(e.target.value)}
                                    placeholder="Enter ISBN"
                                />
                            </div>

                            <div>
                                <label htmlFor="searchTitle">Search by title:</label>
                                <input
                                    id="searchTitle"
                                    type="text"
                                    value={searchTitle}
                                    onChange={(e) => setSearchTitle(e.target.value)}
                                    placeholder="Enter book title"
                                />
                            </div>
                        </div>

                        <div className="filter-row">
                            <div>
                                <label htmlFor="author">Filter by author:</label>
                                <select
                                    id="author"
                                    value={selectedAuthor}
                                    onChange={(e) => setSelectedAuthor(e.target.value)}
                                >
                                    <option value="">Select Author</option>
                                    {authors.map((author) => (
                                        <option key={author.authorId} value={author.authorId}>
                                            {author.firstName} {author.surname}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="genre">Filter by genre:</label>
                                <select
                                    id="genre"
                                    value={selectedGenre}
                                    onChange={(e) => setSelectedGenre(e.target.value)}
                                >
                                    <option value="">Select Genre</option>
                                    {genres.map((genre) => (
                                        <option key={genre.genreId} value={genre.genreId}>
                                            {genre.genreName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
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
            {books.length === 0 ? (<p className="loading">Your search did not match any results</p>) : (<table className="table">
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.bookId}>
                            <td>
                                <img
                                    src={getCoverImage(book.coverImage)}
                                    alt={book.title}
                                    className="book-cover"
                                    onError={handleImageError}
                                />
                            </td>
                            <td>{book.title}</td>
                            <td>{book.author?.firstName} {book.author?.surname}</td>
                            <td>{book.genre?.genreName}</td>
                            <td>
                                {isLogin && (
                                    <div>
                                        <Link to={`/borrowedBooks/create/${book.bookId}/${book.title}`} className="action-link">
                                            GetBook
                                        </Link>
                                    </div>
                                )}
                                <Link to={`/books/${book.bookId}`} className="action-link">
                                    Details
                                </Link>
                                {isAdmin && (
                                    <div>
                                        <div>
                                            <Link to={`/books/update/${book.bookId}`} className="action-link">
                                                Edit
                                            </Link>
                                        </div>
                                        <div>
                                            <Link to={`/books/delete/${book.bookId}`} className="action-link delete">
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
            {metaData && metaData.TotalPages > 0 && (
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

export default BooksPage;