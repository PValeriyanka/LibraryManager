using LibraryManager.Server.Application.RequestHelpers;
using LibraryManager.Server.Application.RequestHelpers.ModelParameters;
using LibraryManager.Server.Domain.ModelsDTO;

namespace LibraryManager.Server.Application.Services
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
