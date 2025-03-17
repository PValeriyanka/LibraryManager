import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllBorrowedBooks } from '../../services/borrowedBooks';
import { getBookById } from '../../services/books';
import { getUserById } from '../../services/users';
import '../../styles/App.css';

function BorrowedBooksPage() {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [metaData, setMetaData] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        loadBorrowedBooks();
    }, [pageNumber, pageSize, metaData]);

    const loadBorrowedBooks = async () => {
        const { data, metaData } = await fetchAllBorrowedBooks({
            PageNumber: pageNumber,
            PageSize: pageSize,
        });

        for (let borrowBook of data) {
            if (borrowBook.bookId) {
                const book = await getBookById(borrowBook.bookId);
                borrowBook.book = book;
            }
            if (borrowBook.userId) {
                const user = await getUserById(borrowBook.userId);
                borrowBook.user = user;
            }
        }

        setBorrowedBooks(data);
        setMetaData(metaData);
    };

    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPageNumber(1);
    };

    if (!borrowedBooks) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="page">
            <h1>Borrowed Books</h1>
            <br></br>
            <br></br>
            <div className="table-header-container">
                <div className="create-item-container">
                </div>
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
            {borrowedBooks.length === 0 ? (<p className="loading">Your search did not match any results</p>) : (<table className="table">
                <thead>
                    <tr>
                        <th>Book</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowedBooks.map((borrowedBook) => (
                        <tr key={borrowedBook.borrowId}>
                            <td>{borrowedBook.book?.title}</td>
                            <td>{borrowedBook.user?.userName}</td>
                            <td>
                                 <div>
                                    <Link to={`/borrowedBooks/${borrowedBook.borrowId}`} className="action-link">
                                        Details
                                    </Link>
                                </div>
                                <div>
                                    <Link to={`/borrowedBooks/delete/${borrowedBook.borrowId}/${encodeURIComponent(borrowedBook.book?.title)}`} className="action-link delete">
                                        Return Book
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

export default BorrowedBooksPage;