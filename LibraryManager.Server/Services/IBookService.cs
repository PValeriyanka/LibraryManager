using LibraryManager.Server.ModelsDTO;
using LibraryManager.Server.Models;
using LibraryManager.Server.RequestHelpers.ModelParameters;
using LibraryManager.Server.RequestHelpers;

namespace LibraryManager.Server.Services
{
    public interface IBookService
    {
        Task<PagedList<BookDTO>> GetAllBooks(BookParameters bookParameters);
        Task<IEnumerable<BookDTO>> GetBooks();
        Task<BookDTO> GetBookById(int id);
        Task AddBook(BookDTO bookDTO);
        Task UpdateBook(int id, BookDTO bookDTO);
        Task DeleteBook(int id);
    }
}
