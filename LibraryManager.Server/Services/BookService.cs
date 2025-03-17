using LibraryManager.Server.Models;
using LibraryManager.Server.ModelsDTO;
using LibraryManager.Server.Repositories;
using LibraryManager.Server.RequestHelpers;
using LibraryManager.Server.RequestHelpers.ModelParameters;
using Microsoft.EntityFrameworkCore;

namespace LibraryManager.Server.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<PagedList<BookDTO>> GetAllBooks(BookParameters bookParameters)
        {
            var pagedBooks = await _bookRepository.GetAllBooks(bookParameters);

            var booksDTO = pagedBooks.Select(b => new BookDTO
            {
                BookId = b.BookId,
                ISBN = b.ISBN,
                Title = b.Title,
                Description = b.Description,
                CoverImage = b.CoverImage,
                GenreId = b.GenreId,
                AuthorId = b.AuthorId
            }).ToList();

            return new PagedList<BookDTO>(booksDTO, pagedBooks.MetaData.TotalCount, pagedBooks.MetaData.CurrentPage, pagedBooks.MetaData.PageSize);
        }

        public async Task<IEnumerable<BookDTO>> GetBooks()
        {
            var books = await _bookRepository.GetBooks();

            var booksDTO = books.Select(b => new BookDTO
            {
                BookId = b.BookId,
                ISBN = b.ISBN,
                Title = b.Title,
                Description = b.Description,
                CoverImage = b.CoverImage,
                GenreId = b.GenreId,
                AuthorId = b.AuthorId
            }).ToList();

            return booksDTO;
        }

        public async Task<BookDTO> GetBookById(int id)
        {
            var book = await _bookRepository.GetBookById(id);

            if (book == null)
            {
                return null;
            }

            return new BookDTO
            {
                BookId = book.BookId,
                ISBN = book.ISBN,
                Title = book.Title,
                Description = book.Description,
                CoverImage = book.CoverImage,
                GenreId = book.GenreId,
                AuthorId = book.AuthorId
            };
        }

        public async Task AddBook(BookDTO bookDTO)
        {
            Book book = new Book();

            book.BookId = bookDTO.BookId;
            book.Title = bookDTO.Title;
            book.Description = bookDTO.Description;
            book.ISBN = bookDTO.ISBN;
            book.CoverImage = bookDTO.CoverImage;
            book.GenreId = bookDTO.GenreId;
            book.AuthorId = bookDTO.AuthorId;

            await _bookRepository.AddBook(book);
        }

        public async Task UpdateBook(int id, BookDTO bookDTO)
        {
            var book = await _bookRepository.GetBookById(id);

            if (book == null)
            {
                throw new Exception("Book not found.");
            }

            book.Title = bookDTO.Title ;
            book.Description = bookDTO.Description;
            book.ISBN = bookDTO.ISBN;
            book.CoverImage = bookDTO.CoverImage;
            book.GenreId = bookDTO.GenreId;
            book.AuthorId = bookDTO.AuthorId;

            await _bookRepository.UpdateBook(book);
        }

        public async Task DeleteBook(int id)
        {
            await _bookRepository.DeleteBook(id);
        }
    }
}