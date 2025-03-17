using LibraryManager.Server.Models;
using LibraryManager.Server.RequestHelpers;
using LibraryManager.Server.RequestHelpers.ModelParameters;
using Microsoft.EntityFrameworkCore;

namespace LibraryManager.Server.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly LibraryContext _context;

        public BookRepository(LibraryContext context)
        {
            _context = context;
        }

        public async Task<PagedList<Book>> GetAllBooks(BookParameters bookParameters)
        {
            var booksQuery = _context.Books
                         .Include(b => b.Author)
                         .Include(b => b.Genre)
                         .AsQueryable();

            if (!string.IsNullOrWhiteSpace(bookParameters.searchById) && int.TryParse(bookParameters.searchById, out int bookId))
            {
                booksQuery = booksQuery.Where(b => b.BookId == bookId);
            }

            if (!string.IsNullOrWhiteSpace(bookParameters.searchByISBN))
            {
                booksQuery = booksQuery.Where(b => b.ISBN.Contains(bookParameters.searchByISBN));
            }

            if (!string.IsNullOrWhiteSpace(bookParameters.searchByTitle))
            {
                booksQuery = booksQuery.Where(b => b.Title.Contains(bookParameters.searchByTitle));
            }

            if (bookParameters.searchByGenre.HasValue)
            {
                booksQuery = booksQuery.Where(b => b.GenreId == bookParameters.searchByGenre.Value);
            }

            if (bookParameters.searchByAuthor.HasValue)
            {
                booksQuery = booksQuery.Where(b => b.AuthorId == bookParameters.searchByAuthor.Value);
            }

            booksQuery = booksQuery.Where(b => !_context.BorrowedBooks.Any(bb => bb.BookId == b.BookId));

            var count = await booksQuery.CountAsync();

            var books = await booksQuery
                .Skip((bookParameters.PageNumber - 1) * bookParameters.PageSize)
                .Take(bookParameters.PageSize)
                .ToListAsync();

            return new PagedList<Book>(books, count, bookParameters.PageNumber, bookParameters.PageSize);
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<Book> GetBookById(int id)
        {
            return await _context.Books.Include(b => b.Author).Include(b => b.Genre).FirstOrDefaultAsync(b => b.BookId == id);
        }

        public async Task AddBook(Book book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBook(Book book)
        {
            _context.Books.Update(book);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBook(int id)
        {
            var book = await GetBookById(id);
            if (book != null)
            {
                _context.Books.Remove(book);
                await _context.SaveChangesAsync();
            }
        }
    }
}