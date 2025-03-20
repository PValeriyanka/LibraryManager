using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.Models;

namespace LibraryManager.Server.Infrastructure.Repositories
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