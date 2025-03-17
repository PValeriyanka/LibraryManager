using LibraryManager.Server.Models;
using LibraryManager.Server.RequestHelpers;
using LibraryManager.Server.RequestHelpers.ModelParameters;

namespace LibraryManager.Server.Repositories
{
    public interface IBookRepository
    {
        Task<PagedList<Book>> GetAllBooks(BookParameters bookParameters);
        Task<IEnumerable<Book>> GetBooks();
        Task<Book> GetBookById(int id);
        Task AddBook(Book book);
        Task UpdateBook(Book book);
        Task DeleteBook(int id);
    }
}